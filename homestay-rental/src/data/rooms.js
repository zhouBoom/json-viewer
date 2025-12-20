// 模拟房源数据
export const rooms = [
    {
        id: 1,
        title: '海景别墅 - 私人泳池',
        description: '坐落在海边的豪华别墅，拥有私人泳池和无敌海景。适合家庭度假或朋友聚会。房间宽敞明亮，设施齐全，让您享受舒适的度假时光。',
        price: 1288,
        rating: 4.9,
        reviews: 128,
        location: '三亚·海棠湾',
        image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
            'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'
        ],
        host: {
            name: '张女士',
            avatar: '👩',
            intro: '超赞房东，5年民宿经营经验'
        },
        facilities: ['WiFi', '空调', '厨房', '洗衣机', '私人泳池', '停车位', '海景', '烧烤设施'],
        bedrooms: 4,
        beds: 5,
        bathrooms: 3,
        maxGuests: 8,
        userReviews: [
            { user: '李先生', rating: 5, comment: '房子超级棒！海景无敌，泳池很干净，房东服务周到。', date: '2024-11' },
            { user: '王女士', rating: 5, comment: '非常满意的一次入住体验，位置好，设施完善。', date: '2024-10' }
        ]
    },
    {
        id: 2,
        title: '市中心loft公寓',
        description: '位于市中心的时尚loft公寓，交通便利，周边商圈繁华。现代简约的装修风格，适合商务出行或情侣度假。',
        price: 388,
        rating: 4.7,
        reviews: 89,
        location: '上海·静安区',
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
            'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'
        ],
        host: {
            name: '陈先生',
            avatar: '👨',
            intro: '热情好客，提供本地旅游建议'
        },
        facilities: ['WiFi', '空调', '电视', '洗衣机', '电梯', '24小时热水'],
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        maxGuests: 2,
        userReviews: [
            { user: '赵女士', rating: 5, comment: '位置超级方便，楼下就是地铁站，房间干净整洁。', date: '2024-11' },
            { user: '孙先生', rating: 4, comment: '性价比很高，适合短期商务出差。', date: '2024-10' }
        ]
    },
    {
        id: 3,
        title: '山间木屋 - 森林氧吧',
        description: '隐藏在山林间的原木小屋，远离城市喧嚣。清晨可以听到鸟鸣，夜晚可以看到星空。适合追求宁静和自然的旅客。',
        price: 568,
        rating: 4.8,
        reviews: 76,
        location: '杭州·西湖区',
        image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80',
            'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80'
        ],
        host: {
            name: '林女士',
            avatar: '👩',
            intro: '自然爱好者，提供登山向导服务'
        },
        facilities: ['WiFi', '壁炉', '厨房', '户外烧烤', '停车位', '观景台'],
        bedrooms: 2,
        beds: 3,
        bathrooms: 1,
        maxGuests: 4,
        userReviews: [
            { user: '周先生', rating: 5, comment: '环境太美了！空气清新，非常适合放松身心。', date: '2024-11' },
            { user: '吴女士', rating: 5, comment: '房东很贴心，提供了很多当地美食推荐。', date: '2024-09' }
        ]
    },
    {
        id: 4,
        title: '古城民宿 - 传统四合院',
        description: '位于古城中心的传统四合院，保留了原汁原味的建筑风格。庭院幽静，适合体验传统文化和慢生活。',
        price: 458,
        rating: 4.9,
        reviews: 156,
        location: '北京·东城区',
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
            'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
            'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80'
        ],
        host: {
            name: '王先生',
            avatar: '👨',
            intro: '老北京人，熟悉胡同文化'
        },
        facilities: ['WiFi', '空调', '茶室', '庭院', '传统家具', '停车位'],
        bedrooms: 3,
        beds: 4,
        bathrooms: 2,
        maxGuests: 6,
        userReviews: [
            { user: '郑女士', rating: 5, comment: '非常有特色的四合院，房东很热情，讲了很多老北京的故事。', date: '2024-11' },
            { user: '刘先生', rating: 5, comment: '地理位置优越，步行可达多个景点。', date: '2024-10' }
        ]
    },
    {
        id: 5,
        title: '湖畔小筑 - 观景阳台',
        description: '坐拥湖景的精致公寓，阳台可直接观赏湖光山色。室内装修温馨舒适，适合情侣或小家庭度假。',
        price: 688,
        rating: 4.8,
        reviews: 92,
        location: '苏州·金鸡湖',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
            'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'
        ],
        host: {
            name: '黄女士',
            avatar: '👩',
            intro: '设计师，注重生活品质'
        },
        facilities: ['WiFi', '空调', '湖景阳台', '智能家居', '洗衣机', '厨房'],
        bedrooms: 2,
        beds: 2,
        bathrooms: 1,
        maxGuests: 4,
        userReviews: [
            { user: '钱先生', rating: 5, comment: '湖景真的太美了！房间布置很有品味。', date: '2024-11' },
            { user: '孙女士', rating: 4, comment: '很舒适的住宿体验，下次还会再来。', date: '2024-10' }
        ]
    },
    {
        id: 6,
        title: '艺术工作室 - 创意空间',
        description: '由艺术家打造的创意空间，充满艺术气息。适合追求个性和灵感的旅客，也可以参加房东组织的艺术工作坊。',
        price: 428,
        rating: 4.7,
        reviews: 64,
        location: '成都·武侯区',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
        images: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
            'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80'
        ],
        host: {
            name: '艺术家小李',
            avatar: '🎨',
            intro: '独立艺术家，提供艺术体验课程'
        },
        facilities: ['WiFi', '空调', '艺术工作室', '投影仪', '咖啡机', '书籍'],
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        maxGuests: 2,
        userReviews: [
            { user: '赵女士', rating: 5, comment: '非常独特的住宿体验，参加了房东的绘画课，很有趣！', date: '2024-10' },
            { user: '钱先生', rating: 4, comment: '充满创意的空间，适合拍照打卡。', date: '2024-09' }
        ]
    }
];
