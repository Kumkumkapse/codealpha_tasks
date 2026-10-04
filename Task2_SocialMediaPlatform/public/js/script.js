let currentUser = null;

// Load posts
async function loadPosts() {
    try {
        const response = await fetch("/api/posts");
        const posts = await response.json();

        displayPosts(posts);
    } catch (error) {
        console.error("Failed to load posts:", error);
    }
}

// Display posts
function displayPosts(posts) {
    const postsContainer = document.getElementById("postsContainer");

    if (posts.length === 0) {
        postsContainer.innerHTML = "<p>No posts available yet.</p>";
        return;
    }

    postsContainer.innerHTML = posts.map(post => `
        <div class="post-card">
            <h3>${post.user?.name || "User"}</h3>

            <p class="post-content">${post.content}</p>

            <div class="post-actions">
                <button onclick="likePost('${post._id}')">
                    ❤️ ${post.likes.length}
                </button>

                <button onclick="showCommentBox('${post._id}')">
                    💬 ${post.comments.length}
                </button>
            </div>

            <div id="comments-${post._id}"></div>
        </div>
    `).join("");
}

// Create post
document.getElementById("createPostBtn").addEventListener("click", async () => {
    const content = document.getElementById("postContent").value.trim();

    if (!content) {
        alert("Please write something before posting.");
        return;
    }

    if (!currentUser) {
        alert("Please login first.");
        return;
    }

    try {
        const response = await fetch("/api/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: currentUser.id,
                content: content
            })
        });

        if (response.ok) {
            document.getElementById("postContent").value = "";
            loadPosts();
        } else {
            alert("Failed to create post.");
        }
    } catch (error) {
        console.error(error);
    }
});

// Like post
async function likePost(postId) {
    if (!currentUser) {
        alert("Please login first.");
        return;
    }

    try {
        const response = await fetch(`/api/posts/${postId}/like`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: currentUser.id
            })
        });

        if (response.ok) {
            loadPosts();
        }
    } catch (error) {
        console.error(error);
    }
}

// Show comment box
function showCommentBox(postId) {
    const container = document.getElementById(`comments-${postId}`);

    container.innerHTML = `
        <div style="margin-top: 12px;">
            <input
                type="text"
                id="comment-${postId}"
                placeholder="Write a comment..."
                style="padding: 8px; width: 70%;"
            >

            <button onclick="addComment('${postId}')">
                Comment
            </button>
        </div>
    `;
}

// Add comment
async function addComment(postId) {
    if (!currentUser) {
        alert("Please login first.");
        return;
    }

    const input = document.getElementById(`comment-${postId}`);
    const text = input.value.trim();

    if (!text) {
        alert("Please write a comment.");
        return;
    }

    try {
        const response = await fetch(`/api/posts/${postId}/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: currentUser.id,
                text: text
            })
        });

        if (response.ok) {
            loadPosts();
        }
    } catch (error) {
        console.error(error);
    }
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
    currentUser = null;
    localStorage.removeItem("socialUser");
    alert("Logged out successfully.");
});

// Load saved user
const savedUser = localStorage.getItem("socialUser");

if (savedUser) {
    currentUser = JSON.parse(savedUser);

    document.getElementById("profileName").textContent = currentUser.name;
    document.getElementById("profileEmail").textContent = currentUser.email;
}

loadPosts();