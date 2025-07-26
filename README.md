# Overview

ts-util provides utility classes and functions that allow developers to use Context and handle
errors, just like Golang.

**Error handling**: Handle errors as return values instead of using try-catch block

**Context**: Pass contexts as a value

# Install

Add this to the import map in deno.json:

```json
{
  "imports": {
    "ts-util": "https://raw.githubusercontent.com/MoonlightOffice/ts-util/@latest/mod.ts"
  }
}
```

# Usage

## Err

Define your custom error types.

```TypeScript
import { Err } from "ts-result"

const Err1 = new Err("error 1")
const Err2 = new Err("error 2").add(Err1)
const Err3 = new Err("error 3")

console.log(Err1.is(Err1)) // true
console.log(Err2.is(Err1)) // true
console.log(Err2.is(Err3)) // false
console.log(Err3.is(Err1)) // false

console.log(Err1.toString())
// error 1
console.log(Err2.toString())
// error 2: error 1
```

## Result

Return values and errors. Use result() when returning a Result value.

```TypeScript
import { Err, result } from "ts-result"

const ErrNotFound = new Err("not found")

const res1 = result(true, "Success value")
const res2 = result(false, ErrNotFound)
const res3 = result(false, "user doesn't exist", ErrNotFound)
```

Sample usage is as follows.

```TypeScript
import { Err, type Result, result } from "ts-result"

const ErrNotFound = new Err("not found")

interface User {
  id: string
  name: string
}

async function fetchUserData(): Promise<Result<User>> {
  try {
    const resp = await fetch("https://example.com/api/user")
    const u: User = await resp.json()
    return result(true, u)
  } catch {
    return result(false, ErrNotFound)
  }
}

async function main() {
  const user = await fetchUserData()
  if (user.err !== null) {
    if (user.err.is(ErrNotFound)) {
      console.log("invalid user input")
      return
    }

    console.error("unexpected error had occurred:", user.err.toString())
    return
  }

  console.log(`User id: ${user.val.id}, User name: ${user.val.name}`)
}

if (import.meta.main) {
  main()
}
```

## Context

```TypeScript
import { sleep } from "ts-util"

async function someLongRunningOperation(ctx: Context) {
  let count = 0
  while (true) {
    if (ctx.get("stop")) {
      return
    }
    console.log("Count:", count)
    count++
    await sleep(100)
  }
}

async function main() {
  const ctx = new Context({
    "foo": "bar",
    "some-number": 123,
    "stop": false,
  })

  someLongRunningOperation(ctx)

  await sleep(1000)

  ctx.set("stop", true)
}

main()
```
