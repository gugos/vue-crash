import axios from "axios"
import { generateWhereClause } from "@/utils/generateWhereClause.js"

const base_url = "https://play.clickhouse.com"
const default_params = {
    add_http_cors_header: 1,
    user: "play",
    password: "",
    default_format: "JSONCompact",
    max_result_rows: 1000,
    max_result_bytes: 10000000,
    result_overflow_mode: "break"
}

export function getChartData(filter) {
    let whereClause = generateWhereClause(filter)
    if(whereClause !== "") {
        whereClause += " and "
    } else {
        whereClause = "where"
    }

    return axios.get(base_url, {
        params: {
            ...default_params,
            query: 
            `select m, sum(cnt) from (
                select toMonth(file_time) as m, count(toMonth(file_time)) as cnt
                from default.github_events
                ${whereClause} file_time between toDateTime('2021-01-01 00:00:00') and toDateTime('2021-12-31 00:00:00') group by file_time
            ) as t group by m order by m`
        }
    })
}

export function getTableData(offset, limit, filter) {
    return axios.get(base_url, {
        params: {
            ...default_params,
            query: 
            `select * from default.github_events ${generateWhereClause(filter)} limit ${offset}, ${limit}`
        }
    })
}

export function getRowCount(filter) {
    return axios.get(base_url, {
        params: {
            ...default_params,
            query: 
            "select count(*) from default.github_events" + generateWhereClause(filter)
        }
    })
}
