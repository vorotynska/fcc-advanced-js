// build a freeCodeCamp forum leaderboard that displays the 
// latest topics, users, and replies from the freeCodeCamp forum. 

const forumLatest =
    'https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json';
const forumTopicUrl = 'https://forum.freecodecamp.org/t/';
const forumCategoryUrl = 'https://forum.freecodecamp.org/c/';
const avatarUrl = 'https://sea1.discourse-cdn.com/freecodecamp';

const allCategories = {
    299: {
        category: 'Career Advice',
        className: 'career'
    },
    409: {
        category: 'Project Feedback',
        className: 'feedback'
    },
    417: {
        category: 'freeCodeCamp Support',
        className: 'support'
    },
    421: {
        category: 'JavaScript',
        className: 'javascript'
    },
    423: {
        category: 'HTML - CSS',
        className: 'html-css'
    },
    424: {
        category: 'Python',
        className: 'python'
    },
    432: {
        category: 'You Can Do This!',
        className: 'motivation'
    },
    560: {
        category: 'Backend Development',
        className: 'backend'
    }
};

// compute the time difference between the time passed as an argument and the current time
function timeAgo(isoTimestamp) {
    const now = new Date();
    const past = new Date(isoTimestamp);

    const diffMs = now - past; // разница в миллисекундах

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) {
        return `${diffMinutes}m ago`;
    } else if (diffHours < 24) {
        return `${diffHours}h ago`;
    } else {
        return `${diffDays}d ago`;
    }
}

// take the number of views of a post as the argument fnd return return the views value
function viewCount(numberViews) {
    if (numberViews >= 1000) {
        return Math.floor((numberViews / 1000)) + "k";
    } else {
        return numberViews;
    }
}

// verify that the selected category id is a property of the allCategories object
function forumCategory(id) {
    let categoryData = allCategories[id];
    if (!categoryData) {
        categoryData = {
            category: "General",
            className: "general"
        };
    }
    const {
        category,
        className
    } = categoryData;

    return `<a href="${forumCategoryUrl}${className}/${id}" class="category ${className}">${category}</a>`;
}

// return a string made by joining img elements, one for each poster found inside
function avatars(posters, users) {
    return posters.map(poster => {
        const user = users.find(u => u.id === poster.user_id);
        if (!user) return '';
        let src = user.avatar_template.replace('{size}', 30);

        // check for relative path (does not start with http)
        if (!src.startsWith('http')) {
            src = `${avatarUrl}${src}`;
        }

        return `<img src="${src}" alt="${user.name}">`;
    }).join('');
}

// should extract the users and topic_list properties from the object passed as 
// argument and should process the  properties of the objects from the topics array
function showLatestPosts(data) {
    const {
        users,
        topic_list
    } = data;
    const topics = topic_list.topics;

    const rows = topics.map(topic => {
        const {
            id,
            title,
            views,
            posts_count,
            slug,
            posters,
            category_id,
            bumped_at
        } = topic;

        return `
          <tr>
            <td>
             <a class="post-title" target="_blank" href="${forumTopicUrl}${slug}/${id}">${title}</a>
            ${forumCategory(category_id)}
            </td>
            <td>
              <div class="avatar-container">${avatars(posters, users)}</div>
            </td>
            <td>
              ${posts_count - 1}
            </td>
            <td>${viewCount(views)}</td>
            <td>${timeAgo(bumped_at)}</td>
          </tr>
        `;
    }).join("");

    document.getElementById("posts-container").innerHTML = rows
}

async function fetchData() {
    try {
        const res = await fetch(forumLatest);
        const data = await res.json();
        showLatestPosts(data);
    } catch (err) {
        console.log('Error fetching data:', err);
    }
};
fetchData();