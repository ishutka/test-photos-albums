<template>
    <div class="vendor-filter">
        <div class="vendor-filter__header">
            <div class="vendor-filter__title">
                Фильтр:
                <span
                    class="vendor-filter__name"
                    @click="setFilter('ABC')"
                    :class="{ active: activeFilter == 'ABC' }"
                    >
                    По альбомам
                </span>
                <span
                class="vendor-filter__name"
                @click="setFilter('Favorites')"
                :class="{ active: activeFilter == 'Favorites' }"
                >
                Избранное
                </span>
            </div>
        </div>
        <div class="vendor-filter__scroll-wrap">
            <div class="vendor-filter__scroll">
                <div class="vendor-filter__list">
                    <div class="vendor-filter__item"></div>
                    <div class="vendor-filter__item"></div>
                    <div class="vendor-filter__item"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {},

    data () {
        return {
            activeFilter: 'ABC',
        };
    },

    computed: {},

    mounted () {
        this.activeFilter = window.localStorage.getItem('activeFilter') || this.activeFilter;
    },

    methods: {
        setFilter (val) {
            this.activeFilter = val;
            window.localStorage.setItem('activeFilter', val);
        },
    },
};
</script>

<style lang="scss">
.vendor-filter {
    font-weight: 700;
    font-family: Open Sans, Roboto, sans-serif;
    width: 1300px;
    height: 600px;
    margin: auto;
    padding: 3.6rem 4.8rem 6rem;
    font-size: 1.2rem;
    background: #ffffff;
    border-radius: 1.2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    &__header {
        margin: 0 0 1.5rem;
    }

    &__title {
        font-weight: bold;
        font-size: 1.4rem;
        line-height: 1.9rem;
    }

    &__name {
        margin: 0 0.5rem;
        text-decoration: underline;
        cursor: pointer;
        &.active {
            color: #3E5EF2;
        }
    }

    &__scroll-wrap {
        overflow: hidden;
        flex: 1 0 auto;
    }

    &__scroll {
        width: 100%;
        max-height: 66rem;
        overflow-y: auto;
    }

    &__list {
        position: relative;
    }
}
</style>
