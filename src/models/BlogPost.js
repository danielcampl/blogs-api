module.exports = (sequelize, DataTypes) => {
    const blogPost = sequelize.define('BlogPost', {
        id: {          
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        content: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        userId: {
          type: DataTypes.STRING,
          allowNull: false,
          foreignKey: true,
        },
        published: {
          type: DataTypes.DATE,
        },
        updated: {
          type: DataTypes.DATE,
        },
      },
      {
        tableName: 'blog_posts',
        timestamps: false,
          underscored: true,
      }
    );
  
    blogPost.associate = (models) => {
      blogPost.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
    };
  
    return blogPost;
  };
  