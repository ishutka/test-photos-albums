<template>
    <div class="photo-item">
        <div class="photo-item__img-wrap"><img :src="item.thumbnailUrl" :alt="item.title"></div>
        <div class="photo-item__name">{{ item.title }}</div>
        <button class="photo-item__favorite-status"
            @click="switchFavorite"
            :title="btnTitle">
            <i :class="{ favorite : photoIsInFavorites }" :area-label="btnTitle"></i>
        </button>
    </div>
</template>
<script>
export default {
    props: {
        item: {
            type: Object,
            required: true,
        },
        isFavorite: {
            type: Boolean,
            require: true,
        },
    },

    computed: {
        btnTitle () {
            return this.photoIsInFavorites ? 'remove frome Favorites' : 'add to Favorites';
        },
        photoIsInFavorites: {
            get () {
                return this.isFavorite;
            },
            set (val) {
                return val;
            },
        },
    },

    methods: {
        switchFavorite () {
            this.photoIsInFavorites = !this.photoIsInFavorites;
            this.$parent.$emit('changeFavorites', this.item);
        },
    },
};
</script>
<style lang="scss">
.photo-item {
    display: flex;
    align-items: center;
    padding: 4px;
    background: #F7F8F9;
    border-radius: 8px;
    margin-bottom: 8px;

    &__img-wrap {
        width: 32px;
        height: 32px;
        flex: 0 0 32px;
        margin-right: 12px;
        border-radius: 8px;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
        }
    }

    &__name {
        margin-right: auto;
        font-weight: bold;
        font-size: 12px;
        color: #1C214C;
    }

    &__favorite-status {
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        align-self: stretch;
        cursor: pointer;
        border: none;
        background: none;
        flex: 0 0 auto;

        i {
            filter: none;
            transition: filter .3s;
        }

        &:hover i {
            filter: brightness(0.7);
        }

        i:before {
            content: url('../static/img/rate_empty.png');
        }

        i.favorite:before {
            content: url('../static/img/rate_full.png');
        }
    }
}
</style>
