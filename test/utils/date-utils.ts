import { advanceTo } from "jest-date-mock"

const past = new Date("Mon Jan 03 2022 20:11:15 GMT+0100 (British Summer Time)")
const present = new Date("Tue Jan 04 2022 20:11:15 GMT+0100 (British Summer Time)")
const future = new Date("Wed Jan 05 2023 20:11:15 GMT+0100 (British Summer Time)")

const advanceToPast = () => advanceTo(past)
const advanceToPresent = () => advanceTo(present)
const advanceToFuture = () => advanceTo(future)

export default { past, present, future, advanceToPast, advanceToPresent, advanceToFuture }
