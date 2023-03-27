class BlogDTO {
  constructor(blog) {
    this.id = blog.id;
    this.title = blog.title;
    this.description = blog.description;
    this.createdAt = blog.createdAt;
    this.updatedAt = blog.updatedAt;
    this.authorId = blog.authorId;
    this.authorFullName = blog.author.fullName;
    this.authorUsername = blog.author.username;
    this.authorEmail = blog.author.email;
  }
}

module.exports = BlogDTO;
