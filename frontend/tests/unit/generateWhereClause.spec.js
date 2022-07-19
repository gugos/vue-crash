import { generateWhereClause } from "@/utils/generateWhereClause.js"

describe("generateWhereClause", () => {
    test("Filter is NULL", () => {
        expect(generateWhereClause(null)).toBe("")
    })

    test("Filter contains event_type and ref_type", () => {
        const filter = {
            event_type: ["one","two","three"],
            ref_type: ["one","two","three"]
        }

        expect(generateWhereClause(filter)).toBe(
            ` where event_type in ('one','two','three') and ref_type in ('one','two','three')`)
    })

    test("Filter contains event_type", () => {
        const filter = {
            event_type: ["one","two","three"]
        }

        expect(generateWhereClause(filter)).toBe(
            ` where event_type in ('one','two','three')`)
    })

    test("Filter contains ref_type", () => {
        const filter = {
            ref_type: ["one","two","three"]
        }

        expect(generateWhereClause(filter)).toBe(
            ` where ref_type in ('one','two','three')`)
    })

    test("Filter contains empty ref_type", () => {
        const filter = {
            ref_type: []
        }

        expect(generateWhereClause(filter)).toBe("")
    })
})