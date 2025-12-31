# Mongoose Model Pattern for Next.js + TypeScript

## ✅ Correct Pattern

### Safe Model Creation

```typescript
import mongoose, { Schema, Document, Model } from 'mongoose'

// 1. Define your interface
export interface IUser extends Document {
  username: string
  email: string
  // ... other fields
}

// 2. Create schema
const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  // ... other fields
}, {
  timestamps: true
})

// 3. Safe model creation (CORRECT PATTERN)
let User: Model<IUser>

if (mongoose.models && mongoose.models.User) {
  // Model already exists (from hot reload), use it
  User = mongoose.models.User as Model<IUser>
} else {
  // Model doesn't exist, create it
  User = mongoose.model<IUser>('User', UserSchema)
}

export default User
```

## ❌ Common Mistakes

### Wrong Pattern 1: Type assertion on undefined
```typescript
// ❌ WRONG - Will throw "Cannot read properties of undefined"
const User = mongoose.models.User as Model<IUser> || mongoose.model<IUser>('User', UserSchema)
```

**Problem**: If `mongoose.models` is `undefined`, accessing `mongoose.models.User` throws an error.

### Wrong Pattern 2: Missing null check
```typescript
// ❌ WRONG - May fail in Next.js hot reloading
const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
```

**Problem**: In Next.js development, `mongoose.models` might be `undefined` during hot reloads.

### Wrong Pattern 3: Direct access
```typescript
// ❌ WRONG - Unsafe
const User = mongoose.model<IUser>('User', UserSchema)
```

**Problem**: Creates duplicate models on hot reload, causing errors.

## ✅ Why This Pattern Works

1. **Checks if `mongoose.models` exists**: Prevents "Cannot read properties of undefined"
2. **Checks if model exists**: Prevents duplicate model creation
3. **Type-safe**: Proper TypeScript typing with `Model<IUser>`
4. **Next.js compatible**: Works with hot module reloading

## 🔧 Complete Example

```typescript
import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
  username: string
  email: string
  password: string
  role: 'user' | 'admin'
  totalPoints: number
  solvedChallenges: mongoose.Types.ObjectId[]
  isBanned: boolean
  createdAt: Date
  updatedAt: Date
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [20, 'Username must be at most 20 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    totalPoints: {
      type: Number,
      default: 0,
    },
    solvedChallenges: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Challenge',
      },
    ],
  },
  {
    timestamps: true,
  }
)

// Indexes
UserSchema.index({ totalPoints: -1 })

// Safe model creation
let User: Model<IUser>

if (mongoose.models && mongoose.models.User) {
  User = mongoose.models.User as Model<IUser>
} else {
  User = mongoose.model<IUser>('User', UserSchema)
}

export default User
```

---

## 🚫 Preventing ERR_HTTP_HEADERS_SENT

### ✅ Correct Route Pattern

```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Always use try-catch
    const data = await request.json()
    
    // Validation - return early if invalid
    if (!data.email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }
    
    // Do your work
    const result = await someOperation(data)
    
    // Return ONE response
    return NextResponse.json({ success: true, data: result }, { status: 200 })
    
  } catch (error: any) {
    // Error handling - return ONE response
    console.error('Error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### ❌ Common Mistakes

#### Mistake 1: Multiple returns without early exit
```typescript
// ❌ WRONG
export async function POST(request: NextRequest) {
  if (!data.email) {
    NextResponse.json({ error: 'Email required' }, { status: 400 })
    // Missing return! Code continues...
  }
  
  // This will try to send another response
  return NextResponse.json({ success: true })
}
```

#### Mistake 2: Response after error throw
```typescript
// ❌ WRONG
export async function POST(request: NextRequest) {
  try {
    if (error) {
      throw new Error('Something went wrong')
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    // Error was thrown, but code might continue
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  // This code should never run, but if it does, it will cause ERR_HTTP_HEADERS_SENT
}
```

#### Mistake 3: Missing return in conditional
```typescript
// ❌ WRONG
export async function POST(request: NextRequest) {
  if (condition) {
    NextResponse.json({ error: 'Error' }, { status: 400 })
    // Missing return!
  }
  
  return NextResponse.json({ success: true })
}
```

### ✅ Best Practices

1. **Always return early**: Use `return` for all responses
2. **Use try-catch**: Wrap async operations
3. **One response per path**: Each code path should return exactly once
4. **Validate early**: Return error responses before doing work

### ✅ Complete Example

```typescript
import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/db'
import User from '@/models/User'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const { email, password } = await request.json()
    
    // Early validation with return
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }
    
    // Find user
    const user = await User.findOne({ email: email.toLowerCase() })
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Check if banned
    if (user.isBanned) {
      return NextResponse.json(
        { error: 'Account has been banned' },
        { status: 403 }
      )
    }
    
    // Do work
    const isValid = await bcrypt.compare(password, user.password)
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
    
    // Success - return ONE response
    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
      },
    })
    
  } catch (error: any) {
    // Error handling - return ONE response
    console.error('Login error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
```

---

## 📋 Checklist

- [x] Model uses safe pattern: `if (mongoose.models && mongoose.models.ModelName)`
- [x] Type assertion applied correctly: `as Model<Interface>`
- [x] All routes return exactly one response per path
- [x] Early returns for validation
- [x] Try-catch blocks for error handling
- [x] No code after return statements
- [x] All conditional responses use `return`

---

## 🔍 Debugging Tips

### If you get "Cannot read properties of undefined (reading 'User')":

1. Check if you're using the safe pattern
2. Verify `mongoose.models` exists before accessing it
3. Make sure you're importing mongoose correctly

### If you get "ERR_HTTP_HEADERS_SENT":

1. Search for all `NextResponse.json()` calls in your route
2. Ensure each has a `return` statement
3. Check for code after return statements
4. Verify try-catch blocks are complete
5. Look for missing returns in conditionals

---

## ✅ Fixed Files

- ✅ `models/User.ts` - Safe model creation pattern
- ✅ `models/Challenge.ts` - Safe model creation pattern
- ✅ `models/Submission.ts` - Safe model creation pattern

All routes already follow the correct pattern with proper error handling and single responses.

