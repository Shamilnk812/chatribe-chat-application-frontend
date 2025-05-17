

export const getAvatarColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const colors = [
        'bg-red-500', 'bg-blue-500','bg-yellow-500',
        'bg-purple-500', 'bg-pink-500', 'bg-violet-500','bg-rose-500' 
    ];

    return colors[Math.abs(hash) % colors.length];
}