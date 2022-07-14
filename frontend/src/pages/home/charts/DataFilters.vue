<template>
    <section class="filter">
        <div class="selections">
            <div class="left">
                <MultiSelect 
                    v-model="eventTypeValues"
                    :options="eventTypeOptions"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :searchable="false"
                    placeholder="Select event_type"
                />
            </div>
            <div class="right">
                <MultiSelect 
                    v-model="refTypeValues"
                    :options="refTypeOptions"
                    :multiple="true"
                    :close-on-select="false"
                    :clear-on-select="false"
                    :searchable="false"
                    placeholder="Select ref_type"
                />
            </div>
            <div class="actions">
                <base-button @click="setFilter">Filter</base-button>
                <base-button @click="resetFilter">Reset</base-button>
            </div>
        </div>
    </section>
</template>

<script>
import MultiSelect from "vue-multiselect"

export default {
    components: {
        MultiSelect
    },
    emits: ["set-filter"],
    data() {
        return {
            eventTypeValues: [],
            eventTypeOptions: [
                "ForkEvent",
                "IssueCommentEvent",
                "CommitCommentEvent",
                "CreateEvent",
                "PullRequestEvent",
                "PushEvent",
                "MemberEvent",
                "IssuesEvent",
                "PullRequestReviewCommentEvent",
                "WatchEvent",
                "DeleteEvent",
                "PublicEvent",
                "GollumEvent",
                "ReleaseEvent",
                "PullRequestReviewEvent",
                "GistEvent",
                "FollowEvent",
                "DownloadEvent",
                "ForkApplyEvent",
                "Event",
                "TeamAddEvent"
            ],
            refTypeValues: [],
            refTypeOptions: [
                "none",
                "repository",
                "branch",
                "tag",
                "unknown"
            ]
        }
    },
    methods: {
        setFilter() {
            const filter = {
                event_type: this.eventTypeValues,
                ref_type: this.refTypeValues
            }

            this.$emit("set-filter", filter)
        },
        resetFilter() {
            this.eventTypeValues = []
            this.refTypeValues = []
            this.$emit("set-filter", null)
        }
    }
}

</script>

<style lang="scss" scoped>
@import "vue-multiselect/dist/vue-multiselect.css"; 

.filter {
    .selections {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
        padding-bottom: 1rem;

        .left {
            flex: 1;
            min-width: 200px;
        }

        .right {
            flex: 1;
            min-width: 200px;
        }

        .actions {
            display: flex;
        }
    }

    @media (max-width: 768px) {
        .selections {
            display: block;
            padding-bottom: 1rem;

            .left {
                width: 100%;
                padding-bottom: 1rem;
            }

            .right {
                width: 100%;
                padding-bottom: 1rem;
            }
        }
    }
}
</style>