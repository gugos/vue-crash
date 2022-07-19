export function generateWhereClause(filter) {
    let where = " where "
    if(filter !== null) {
        for(const key of Object.keys(filter)) {
            if(filter[key].length === 0) {
                continue
            }
            if(where !== " where ") {
                where += " and "
            }

            where += `${key} in ('${filter[key].join("','")}')`
        }
    }

    if(where === " where ") {
        where = ""
    }

    return where
}