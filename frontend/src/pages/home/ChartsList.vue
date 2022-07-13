<template>
    <base-container class="charts">
        <section>
            <div class="item">
                <router-link to="/home/clickhouse-test">
                    <base-card class="card">
                        <img src="../../assets/img/clickhouse.svg" width="80" height="80">
                    </base-card>
                    <h4>Clickhouse test</h4>
                </router-link>
            </div>
            <div class="item">
                <base-card class="card disabled">
                    <font-awesome-icon class="icon" icon="lock" />
                </base-card>
                <h4>TODO</h4>
            </div>
            <div class="item">
                <base-card class="card disabled">
                    <font-awesome-icon class="icon" icon="lock" />
                </base-card>
                <h4>TODO</h4>
            </div>
            <div class="item">
                <base-card class="card disabled">
                    <font-awesome-icon class="icon" icon="lock" />
                </base-card>
                <h4>TODO</h4>
            </div>
            <div class="item">
                <base-card class="card disabled">
                    <font-awesome-icon class="icon" icon="lock" />
                </base-card>
                <h4>TODO</h4>
            </div>
            <div class="item">
                <base-card class="card disabled">
                    <font-awesome-icon class="icon" icon="lock" />
                </base-card>
                <h4>TODO</h4>
            </div>
            <div class="item">
                <base-card class="card disabled">
                    <font-awesome-icon class="icon" icon="lock" />
                </base-card>
                <h4>TODO</h4>
            </div>
            <div class="item">
                <base-card class="card disabled">
                    <font-awesome-icon class="icon" icon="lock" />
                </base-card>
                <h4>TODO</h4>
            </div>
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

    .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .card {
            width: 100px;
            height: 100px;
            margin-bottom: 1rem;
            position: relative;
            cursor: pointer;
        
            &:hover {
                box-shadow: none;
                border: 1px solid #333;
                width: 98px;
                height: 98px;
                background-color: #ccc;
            }

            &.disabled {
                pointer-events: none;
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

        a {
            text-decoration: none;
            color: black;
        }
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