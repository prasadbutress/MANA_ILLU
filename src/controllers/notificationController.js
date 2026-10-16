const db = require('../models/db');

/**
 * @route   GET /api/notifications
 * @desc    Get all notifications for user
 * @access  Public / Optional Auth
 */
const getNotifications = async (req, res, next) => {
  try {
    const list = db.getNotifications();
    return res.status(200).json({
      success: true,
      count: list.length,
      unreadCount: list.filter(n => !n.read).length,
      data: list,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/notifications/:id/read
 * @desc    Mark a notification as read
 * @access  Public
 */
const markRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const notif = db.markNotificationAsRead(id);

    if (!notif) {
      return res.status(404).json({
        success: false,
        error: `Notification ${id} not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      data: notif,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/notifications/read-all
 * @desc    Mark all notifications as read
 * @access  Public
 */
const markAllRead = async (req, res, next) => {
  try {
    db.markAllNotificationsAsRead();
    return res.status(200).json({
      success: true,
      message: 'All notifications marked as read.',
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/notifications/:id
 * @desc    Delete a notification
 * @access  Public
 */
const deleteNotification = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = db.deleteNotification(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: `Notification ${id} not found.`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Notification deleted.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
  markRead,
  markAllRead,
  deleteNotification,
};
