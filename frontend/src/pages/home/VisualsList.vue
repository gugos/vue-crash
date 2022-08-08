<template>
    <base-container class="charts">
        <section>
            <router-link to="/home/clickhouse-test">
                <base-card class="card">
                    <img src="../../assets/img/clickhouse.svg" width="80" height="80">
                </base-card>
                <h4>Clickhouse test</h4>
            </router-link>
            <router-link to="/home/d3-test">
                <base-card class="card">
                    <img src="../../assets/img/d3.svg" width="80" height="80">
                </base-card>
                <h4>D3 test</h4>
            </router-link>
            <router-link to="#" class="disabled">
                <base-card class="card disabled">
                    <font-awesome-icon class="icon" icon="lock" />
                </base-card>
                <h4>TODO</h4>
            </router-link>
            <router-link to="#" class="disabled">
                <base-card class="card disabled">
                    <font-awesome-icon class="icon" icon="lock" />
                </base-card>
                <h4>TODO</h4>
            </router-link>
            <router-link to="#" class="disabled">
                <base-card class="card disabled">
                    <font-awesome-icon class="icon" icon="lock" />
                </base-card>
                <h4>TODO</h4>
            </router-link>
            <router-link to="#" class="disabled">
                <base-card class="card disabled">
                    <font-awesome-icon class="icon" icon="lock" />
                </base-card>
                <h4>TODO</h4>
            </router-link>
            <router-link to="#" class="disabled">
                <base-card class="card disabled">
                    <font-awesome-icon class="icon" icon="lock" />
                </base-card>
                <h4>TODO</h4>
            </router-link>
            <router-link to="#" class="disabled">
                <base-card class="card disabled">
                    <font-awesome-icon class="icon" icon="lock" />
                </base-card>
                <h4>TODO</h4>
            </router-link>
        </section>
    </base-container>
</template>

<script>
export default {

}
</script>

<style lang="scss">
@import "../../assets/styles/variables.scss";

.charts {
    section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;

    // display: grid;
    // grid-template-columns: repeat(auto-fill, 100px);
    // justify-content: space-between;
    // grid-gap: 20px;

    a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: black;

        &.disabled {
            pointer-events: none;
        }

        .card {
            width: 100px;
            height: 100px;
            margin-bottom: 1rem;
            position: relative;
            cursor: pointer;

            &.disabled {
                background-color: rgb(151, 151, 151);
            }

            .icon {
                @include absolute-center;
                font-size: 25px;
                color: #333;
            }

            img {
                @include absolute-center;
            }
        }

        &:hover {
            .card, .card:hover {
                box-shadow: none;
                border: 1px solid #333;
                width: 98px;
                height: 98px;
                background-color: #ccc;
            }
        }

        // a {
        //     text-decoration: none;
        //     color: black;
        // }
    }

    // .fill-space {
    //     // content: "";
    //     // flex-grow: 1;
    //     // justify-content: space-between;
    //     // gap: 1rem;
    //     border: 1px solid red;
    // }
}
}

</style>