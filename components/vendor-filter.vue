<template>
    <div class="vendor-filter">
        <div class="vendor-filter__header">
            <div class="vendor-filter__title">
                Фильтр:
                <button
                    class="vendor-filter__name"
                    @click="setFilter('ABC')"
                    :class="{ active: activeFilter == 'ABC' }"
                    >
                    По альбомам
                </button>
                <button
                class="vendor-filter__name"
                @click="setFilter('Favorites')"
                :class="{ active: activeFilter == 'Favorites' }"
                >
                Избранное
                </button>
            </div>
        </div>
        <div class="vendor-filter__scroll-wrap">
            <div class="vendor-filter__scroll">
                <div class="vendor-filter__list" v-if="activeFilter == 'Favorites'">
                    <div class="vendor-filter__item" v-for="photo in favorites" :key="photo.id" >
                        <photo-item :item="photo" :isFavorite="true"/>
                    </div>
                </div>
                <div v-else class="vendor-filter__list">
                    <div class="vendor-filter__item album" v-for="album in photosByAlbums" :key="album.name">
                        <div class="vendor-filter__album-name">
                            {{ album.name }}
                        </div>
                        <photo-item v-for="photo in album.items" :item="photo"
                            :isFavorite="favorites.find(p => p.id === photo.id) ? true : false"
                            :key="photo.id">
                        </photo-item>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import photoItem from '@/components/photo-item';

export default {
    components: { photoItem },

    data () {
        return {
            activeFilter: 'ABC',
            favorites: [],
            photosByAlbums: [],
        };
    },

    mounted () {
        this.activeFilter = window.localStorage.getItem('activeFilter') || this.activeFilter;
        this.fetchData();
        this.$on('changeFavorites', this.changeFavorites);
    },

    methods: {
        setLocalstorageFavorites () {
            window.localStorage.setItem('Favorites', JSON.stringify(this.favorites));
        },
        changeFavorites (photo) {
            const photoInFavorites = this.favorites.find((item) => item.id === photo.id);
            this.favorites = photoInFavorites
                ? this.favorites.filter((f) => f.id !== photo.id)
                : [...this.favorites, photo];
            this.setLocalstorageFavorites();
        },
        getFavoritesFromLocalstorage () {
            try {
                this.favorites = JSON.parse(window.localStorage.getItem('Favorites')) || [];
            } catch (e) {
                window.localStorage.removeItem('Favorites');
                throw Error(e);
            }
        },
        setFilter (val) {
            this.activeFilter = val;
            window.localStorage.setItem('activeFilter', val);
        },
        fetchData () {
            axios.get('https://jsonplaceholder.typicode.com/photos')
                .then(({ data }) => {
                    const photos = data.slice(0, 100);
                    this.getFavoritesFromLocalstorage();
                    this.sortPhotosByABC(photos);
                })
                .catch((error) => {
                    throw new Error(error);
                });
        },
        sortPhotosByABC (photos) {
            photos.forEach((photo) => {
                const albumName = photo.title.slice(0, 1).toUpperCase();
                let album = this.photosByAlbums.find((al) => al.name === albumName);
                if (!album) {
                    album = { name: albumName, items: [photo] };
                    this.photosByAlbums = [...this.photosByAlbums, album];
                } else if (!album.items.find((i) => i.id === photo.id)) album.items = [...album.items, photo];
            });

            this.photosByAlbums.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }

                return 0;
            });
        },
    },

    beforeDestroy () {
        this.$off('changeFavorites', this.changeFavorites);
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
        border: none;
        background: none;
        cursor: pointer;
        &.active {
            color: #3E5EF2;
        }
    }

    &__scroll-wrap {
        overflow: hidden;
    }

    &__scroll {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        &::-webkit-scrollbar {
            display: none;
        }
    }

    &__list {
        position: relative;
        column-count: 4;
        column-gap: 2rem;
        column-width: 23rem;
    }

    &__item {
        width: 100%;
        display: inline-block;

        &.album {
            margin-bottom: 18px;
        }
    }

    &__album-name {
        padding-left: 18px;
        width: 100%;
        margin-bottom: 8px;
    }
}
</style>
