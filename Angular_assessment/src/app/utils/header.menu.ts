export interface MenuItem {
    text: string;
    id: string;
    url: string;
    children?: MenuItem[];
}

export const MENU_ITEMS: MenuItem[] = [
    {
        text: 'Pokédex',
        id: 'pokedex',
        url: '#',
        children: [
            { text: 'Tất cả Pokémon', id: 'all-pokemon', url: '#' },
            { text: 'Theo vùng', id: 'by-region', url: '#' },
            { text: 'Theo hệ', id: 'by-type', url: '#' },
            { text: 'Huyền thoại', id: 'legendary', url: '#' },
        ],
    },
    {
        text: 'Pokémon của tôi',
        id: 'my-pokemon',
        url: '#',
        children: [
            { text: 'Bộ sưu tập của tôi', id: 'my-collection', url: '#' },
            { text: 'Trạng thái huấn luyện', id: 'training-status', url: '#' },
            { text: 'Sẵn sàng tiến hóa', id: 'evolution-ready', url: '#' },
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
        children: [
            { text: 'Tin mới nhất', id: 'latest-news', url: '#' },
            { text: 'Cập nhật', id: 'updates', url: '#' },
            { text: 'Cộng đồng', id: 'community', url: '#' },
        ],
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
