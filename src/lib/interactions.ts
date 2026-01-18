
const LIKES_KEY = 'boulevard-likes';
const USER_LIKES_KEY = 'boulevard-user-likes';
const BOOKMARKS_KEY = 'boulevard-bookmarks';

export interface LikesData {
    [blogId: string]: number;
}

export interface UserLikesData {
    [blogId: string]: boolean;
}

export interface BookmarksData {
    [blogId: string]: boolean;
}


const dispatchBookmarkChange = () => {
    window.dispatchEvent(new Event('bookmarksChanged'));
};


export const getLikes = (): LikesData => {
    try {
        const data = localStorage.getItem(LIKES_KEY);
        return data ? JSON.parse(data) : {};
    } catch {
        return {};
    }
};

export const getUserLikes = (): UserLikesData => {
    try {
        const data = localStorage.getItem(USER_LIKES_KEY);
        return data ? JSON.parse(data) : {};
    } catch {
        return {};
    }
};

export const getBlogLikes = (blogId: number): number => {
    const likes = getLikes();
    return likes[blogId] || 0;
};

export const hasUserLiked = (blogId: number): boolean => {
    const userLikes = getUserLikes();
    return userLikes[blogId] || false;
};

export const toggleLike = (blogId: number): { likes: number; liked: boolean } => {
    const likes = getLikes();
    const userLikes = getUserLikes();

    const currentlyLiked = userLikes[blogId] || false;

    if (currentlyLiked) {

        likes[blogId] = Math.max(0, (likes[blogId] || 0) - 1);
        userLikes[blogId] = false;
    } else {

        likes[blogId] = (likes[blogId] || 0) + 1;
        userLikes[blogId] = true;
    }

    localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
    localStorage.setItem(USER_LIKES_KEY, JSON.stringify(userLikes));

    return { likes: likes[blogId], liked: userLikes[blogId] };
};


export const getBookmarks = (): BookmarksData => {
    try {
        const data = localStorage.getItem(BOOKMARKS_KEY);
        const parsed = data ? JSON.parse(data) : {};
        return parsed;
    } catch {
        return {};
    }
};

export const isBookmarked = (blogId: number): boolean => {
    const bookmarks = getBookmarks();
    const result = bookmarks[blogId] === true;
    return result;
};

export const toggleBookmark = (blogId: number): boolean => {
    const bookmarks = getBookmarks();
    const currentValue = bookmarks[blogId];


    if (currentValue === true) {
        bookmarks[blogId] = false;
    } else {
        bookmarks[blogId] = true;
    }


    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    dispatchBookmarkChange();
    return bookmarks[blogId];
};

export const getBookmarkedIds = (): number[] => {
    const bookmarks = getBookmarks();
    const ids = Object.keys(bookmarks)
        .filter(id => {
            const isBookmarked = bookmarks[id] === true;
            console.log(`  - ID ${id}: value=${bookmarks[id]}, isBookmarked=${isBookmarked}`);
            return isBookmarked;
        })
        .map(id => parseInt(id));
    return ids;
};
