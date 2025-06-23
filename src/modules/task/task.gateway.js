const { query } = require('../../utils/mysql');

const getAllByUserId = async (userId) => {
    const sql = 'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC';
    return await query(sql, [userId]);
};

const create = async ({ title, description, status = 'pendiente', user_id }) => {
    if (!title || !description || !user_id) throw Error('Missing fields');
    const sql = `INSERT INTO tasks (title, description, status, user_id)
               VALUES (?, ?, ?, ?)`;
    const { insertId } = await query(sql, [title, description, status, user_id]);

    return { id: insertId, title, description, status, user_id };
};

const update = async (id, { title, description, status }) => {
    if (!id || !title) throw Error('Missing fields');

    const sql = `UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?`;
    await query(sql, [title, description, status, id]);

    return { id, title, description, status };
};

const remove = async (id) => {
    const sql = `DELETE FROM tasks WHERE id = ?`;
    await query(sql, [id]);
    return { deleted: true };
};

module.exports = {
    getAllByUserId,
    create,
    update,
    remove,
};
