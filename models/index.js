const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  define: {
    underscored: true, // Use snake case for automatic table names
    freezeTableName: true, // Prevent sequelize from pluralizing table names
  }
});

const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Initialize models
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    modelName: 'User',
    tableName: 'users', // Make sure this matches your table name
    timestamps: false, // To deactivate the timestamp columns
    freezeTableName: true, // To prevent sequelize from pluralizing table names
    underscored: true, // To use snake case for automatic table names
  }
);

Post.init(
  {
    // Define the Post model attributes
  },
  {
    sequelize,
    modelName: 'Post',
    tableName: 'posts', // Make sure this matches your table name
    timestamps: false, // To deactivate the timestamp columns
    freezeTableName: true, // To prevent sequelize from pluralizing table names
    underscored: true, // To use snake case for automatic table names
  }
);

Comment.init(
  {
    // Define the Comment model attributes
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments', // Make sure this matches your table name
    timestamps: false, // To deactivate the timestamp columns
    freezeTableName: true, // To prevent sequelize from pluralizing table names
    underscored: true, // To use snake case for automatic table names
  }
);

// Define associations
User.hasMany(Post, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
});

Comment.belongsTo(Post, {
  foreignKey: 'postId'
});

module.exports = {
  User,
  Comment,
  Post,
  sequelize
};
