export interface MenuItem {
    text: string;
    id: string;
    url: string;
    children?: MenuItem[];
}

export const MENU_ITEMS: MenuItem[] = [
    {
        text: 'Pokemon',
        id: 'pokedex',
        url: '#',
        children: [
            { text: 'Tất cả Pokemon', id: 'all-pokemon', url: '/page/all' },

        ],
    },
    {
        text: 'Pokemon của tôi',
        id: 'my-pokemon',
        url: '#',
        children: [
            { text: 'Bộ sưu tập của tôi', id: 'my-collection', url: '/page/my-favorite' },

        ],
    },
    {
        text: 'Đấu trường',
        id: 'battle-arena',
        url: '#',
        children: [
            { text: 'Đấu PvP', id: 'pvp-battles', url: '#' },
            { text: 'Đấu phòng gym', id: 'gym-battles', url: '#' },
            { text: 'Giải đấu', id: 'tournament', url: '#' },
        ],
    },

    {
        text: 'Tin tức Poké',
        id: 'pokenews',
        url: '#',

    },
    {
        text: 'Hướng dẫn huấn luyện',
        id: 'trainers-guide',
        url: '#',
        children: [
            { text: 'Hướng dẫn cho người mới', id: 'beginner-guide', url: '#' },
            { text: 'Chiến thuật chiến đấu', id: 'battle-strategies', url: '#' },
            { text: 'Mẹo huấn luyện', id: 'training-tips', url: '#' },
        ],
    },
    {
        text: 'Sự kiện',
        id: 'events',
        url: '#',
        children: [
            { text: 'Sự kiện sắp tới', id: 'upcoming-events', url: '#' },
            { text: 'Giải đấu', id: 'event-tournaments', url: '#' },
            { text: 'Đột kích đặc biệt', id: 'special-raids', url: '#' },
        ],
    },

];
