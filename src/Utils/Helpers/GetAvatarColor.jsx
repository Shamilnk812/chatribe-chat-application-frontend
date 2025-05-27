

export const getAvatarColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash += str.charCodeAt(i) 
    }

    const colors = [
        'bg-red-500', 'bg-blue-500','bg-yellow-500' ,'bg-yellow-700',
        'bg-purple-500', 'bg-pink-600', 'bg-violet-500','bg-violet-800','bg-rose-500' 
    ];

    return colors[Math.abs(hash) % colors.length];
}