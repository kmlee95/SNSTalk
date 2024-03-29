import express from 'express';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

import passport from 'passport';
import User, { DEFAULT_USER_ATTRIBUTES, FULL_USER_ATTRIBUTES } from '../../models/user';
import { isNotLoggedIn, isLoggedIn } from './middleware';
import Post, { DEFAULT_POST_ATTRIBUTES } from '../../models/post';
import Image, { DEFAULT_IMAGE_ATTRIBUTES } from '../../models/image';
import upload from '../util/imageUploads';

const router = express.Router();

router.get('/', isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.user as User;
    const fullUser = await User.findOne({
      where: { id },
      attributes: FULL_USER_ATTRIBUTES,
    });
    const friendsCount = await User.count({
      include: [
        {
          model: User,
          as: 'Friends',
          where: { userId: id },
        },
      ],
    });
    const result = { ...fullUser.toJSON(), friends: friendsCount };
    return res.json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: parseInt(req.params.id, 10),
      },
      include: [
        {
          model: Post,
          as: 'Posts',
          attributes: ['id'],
        },
        {
          model: User,
          as: 'Friends',
          attributes: ['id'],
        },
      ],
      attributes: DEFAULT_USER_ATTRIBUTES,
    });

    const jsonUser = user.toJSON();
    jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
    jsonUser.Friends = jsonUser.Friends ? jsonUser.Friends.length : 0;

    return res.json(jsonUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/idcheck', isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        userId: req.body.userId,
      },
      attributes: ['userId'],
    });
    return res.json({ exUser });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/signup', isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        userId: req.body.userId,
      },
      attributes: ['userId'],
    });
    if (exUser) {
      return res.status(400).send('이미 사용중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    await User.create({
      familyName: req.body.familyName,
      firstName: req.body.firstName,
      userId: req.body.userId,
      password: hashedPassword,
      birth: req.body.birth,
      gender: req.body.gender,
      phone: req.body.phone,
      mail: req.body.mail,
    });

    return res.json({ result: 'success' });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/signin', isNotLoggedIn, async (req, res, next) => {
  try {
    passport.authenticate('local', (e, user, info) => {
      if (e) {
        return next(e);
      }
      if (info) {
        return res.status(401).send(info.reason);
      }
      return req.login(user, async (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }
        const fullUser = await User.findOne({
          where: { id: user.id },
          attributes: FULL_USER_ATTRIBUTES,
        });
        const friendsCount = await User.count({
          where: { id: user.id },
          include: [
            {
              model: User,
              as: 'Friends',
            },
          ],
        });
        const result = { ...fullUser.toJSON(), friends: friendsCount };
        return res.json(result);
      });
    })(req, res, next);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  if (req.session) {
    req.session.destroy((e) => {
      console.error(e);
    });
  }
  res.send('logout success');
});

router.delete('/friend/:id', isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.user as User;

    const user = await User.findOne({
      where: { id },
    });

    await user.removeFriends(req.params.id);

    const friend = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    await friend.removeFriends(id);

    return res.json({
      userId: id,
      friendId: req.params.id,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/friends', isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.user as User;
    const user = await User.findOne({
      where: { id },
    });

    let where = {};
    if (parseInt(req.query.lastId, 10) !== 0) {
      where = {
        id: {
          [Op.gt]: parseInt(req.query.lastId, 10),
        },
      };
    }

    const friends = await user.getFriends({
      where,
      attributes: DEFAULT_USER_ATTRIBUTES,
      limit: parseInt(req.query.limit, 10),
    });

    return res.json(friends);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

interface UpdateInfo {
  familyName?: string;
  firstName?: string;
  birth?: string;
  phone?: string;
  mail?: string;
  profilePhoto?: string;
}

router.patch('/info', isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.user as User;
    const updateInfo: UpdateInfo = {};
    updateInfo.familyName = req.body.familyName;
    updateInfo.firstName = req.body.firstName;
    updateInfo.birth = req.body.birth;
    updateInfo.phone = req.body.phone;
    updateInfo.mail = req.body.mail;
    updateInfo.profilePhoto = req.body.profilePhoto;

    await User.update(updateInfo, { where: { id } });

    return res.json(updateInfo);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/:id/posts', async (req, res, next) => {
  try {
    let where = {};
    if (req.query.lastUpdatedAt) {
      where = {
        userId: parseInt(req.params.id, 10) || 0,
        updatedAt: {
          [Op.lt]: new Date(req.query.lastUpdatedAt),
        },
      };
    } else {
      where = {
        userId: parseInt(req.params.id, 10) || 0,
      };
    }

    const posts = await Post.findAll({
      where,
      include: [
        {
          model: User,
          attributes: DEFAULT_USER_ATTRIBUTES,
        },
        {
          model: Image,
          attributes: DEFAULT_IMAGE_ATTRIBUTES,
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
      attributes: DEFAULT_POST_ATTRIBUTES,
      order: [['updatedAt', 'DESC']],
      limit: parseInt(req.query.limit, 10),
    });

    return res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/password', isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.user as User;

    const user = await User.findOne({
      where: {
        id,
      },
    });
    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) {
      return res.status(402).send('입력한 비밀번호가 맞지 않습니다.');
    }

    return res.json({ result: true });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.patch('/password', isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.user as User;

    const user = await User.findOne({
      where: {
        id,
      },
    });

    const result = await bcrypt.compare(req.body.originalPassword, user.password);
    if (!result) {
      return res.status(402).send('입력한 비밀번호가 맞지 않습니다.');
    }

    const newHashedPassword = await bcrypt.hash(req.body.newPassword, 12);

    await User.update({ password: newHashedPassword }, { where: { id } });

    return res.json({ result: 'success' });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/image', isLoggedIn, upload.single('image'), (req, res) => {
  const file = req.file as Express.Multer.File;
  return res.json(file.filename);
});

export default router;
