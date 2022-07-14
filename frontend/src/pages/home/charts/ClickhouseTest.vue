<template>
    <base-container>
        <base-dialog :show="!!error" title="An error occurred" @close="handleError">
            {{ error }}
        </base-dialog>
        <DataFilters @set-filter="setFilter" />
        <section class="clickhousetest">
            <div class="table-wrapper">
                <table @scroll="handleScroll" ref="tableRef">
                    <thead>
                        <tr>
                            <th>file_time</th>
                            <th>event_type</th>
                            <th>actor_login</th>
                            <th>repo_name</th>
                            <th>created_at</th>
                            <th>updated_at</th>
                            <th>action</th>
                            <th>comment_id</th>
                            <th>body</th>
                            <th>path</th>
                            <th>position</th>
                            <th>line</th>
                            <th>ref</th>
                            <th>ref_type</th>
                            <th>creator_user_login</th>
                            <th>number</th>
                            <th>title</th>
                            <th>labels</th>
                            <th>state</th>
                            <th>locked</th>
                            <th>assignee</th>
                            <th>assignees</th>
                            <th>comments</th>
                            <th>author_association</th>
                            <th>closed_at</th>
                            <th>merged_at</th>
                            <th>merge_commit_sha</th>
                            <th>requested_reviewers</th>
                            <th>requested_teams</th>
                            <th>head_ref</th>
                            <th>head_sha</th>
                            <th>base_ref</th>
                            <th>base_sha</th>
                            <th>merged</th>
                            <th>mergeable</th>
                            <th>rebaseable</th>
                            <th>mergeable_state</th>
                            <th>merged_by</th>
                            <th>review_comments</th>
                            <th>maintainer_can_modify</th>
                            <th>commits</th>
                            <th>additions</th>
                            <th>deletions</th>
                            <th>changed_files</th>
                            <th>diff_hunk</th>
                            <th>original_position</th>
                            <th>commit_id</th>
                            <th>original_commit_id</th>
                            <th>push_size</th>
                            <th>push_distinct_size</th>
                            <th>member_login</th>
                            <th>release_tag_name</th>
                            <th>release_name</th>
                            <th>review_state</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row, rowIndex in tableData" :key="rowIndex">
                            <td v-for="item, itemIndex in row" :key="itemIndex">{{ item }}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="spinner">
                    <base-spinner v-if="isLoading"></base-spinner>
                </div>
            </div>
        </section>
        <section>
            <ChartGenerator :filter="filter" />
        </section>
    </base-container>
</template>

<script>
import { ref } from "vue"
import DataFilters from "./DataFilters.vue"
import ChartGenerator from "./ChartGenerator.vue"
import { getRowCount, getTableData } from "./queryManager.js"

export default {
    components: {
        DataFilters,
        ChartGenerator
    },
    setup() {
        let rowCount = 0
        const offsetStep = 100
        const limit = 200
        let offset = 0
        const tableData = ref(null)
        const isLoading = ref(false)
        const error = ref(null)
        const filter = ref(null)
        const tableRef = ref(null)

        async function setRowCount() {
            isLoading.value = true
            try {
                const response = await getRowCount(filter.value)
                rowCount = +response.data.data
            } catch(err) {
                error.value = err
            }

            isLoading.value = false
        }

        async function setTableData() {
            isLoading.value = true
            try {
                const response = await getTableData(offset, limit, filter.value)
                tableData.value = response.data.data
            } catch(err) {
                error.value = err
            }

            isLoading.value = false
        }
        
        setRowCount()
        setTableData()

        function handleError() {
            error.value = null
        }

        function handleScroll(e) {
            let bottom = e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop
            let top = e.target.scrollTop

            if(bottom === 0) {
                if(offset + offsetStep > rowCount) {
                    return
                }

                offset += offsetStep
                setTableData()
                e.target.scrollTop = e.target.scrollHeight / 2
            }

            if(top === 0) {
                if(offset - offsetStep < 0) {
                    return
                }

                offset -= offsetStep
                setTableData()
                e.target.scrollTop = e.target.scrollHeight / 2
            }
        }

        function setFilter(newFilter) {
            filter.value = (newFilter === null) ? null : newFilter
            setRowCount()
            setTableData()
            offset = 0
            tableRef.value.scrollTop = 0
        }

        return {
            tableData,
            isLoading,
            error,
            handleError,
            handleScroll,
            filter,
            setFilter,
            tableRef
        }
    }
}
</script>

<style lang="scss">
@import "../../../assets/styles/variables.scss";

.clickhousetest {
    .table-wrapper {
        position: relative;
        table {
            display: block;
            overflow: auto;
            border-collapse: collapse;
            width: 100%;
            height: 300px;

            thead {
                position: sticky;
                top: 0;
                tr {
                    th {
                        border: 1px solid #dddddd;
                        text-align: left;
                        padding: 8px;
                        background-color: #ccc;
                    }
                }
            }

            tbody {
                tr {
                    td {
                        border: 1px solid #dddddd;
                        text-align: left;
                        padding: 4px;
                        font-size: 12px;
                        max-width: 50vw;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    td:hover {
                        white-space: pre-wrap;
                        max-width: none;
                    }
                }

                tr:nth-child(even) {
                    background-color: #dddddd;
                }
            }
        }
        
        .spinner {
            @include absolute-center;
        }
    }
}
</style>