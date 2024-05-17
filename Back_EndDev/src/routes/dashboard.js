import { deleteUserAdmin, reactivacionUserAdmin } from "../handlers/dashboard.js";


export async function deleteUserAdminRoute(req, res) {
    const { id } = req.params;
    try {
        const result = await deleteUserAdmin(id);
        res.json({
            msg: `Usuario eliminado con exito id ${id}`,
            result: result
        });
    } catch (error) {
        res.json({
            msg: error
        })
    }
};

export async function reactivationUserAdminRoute(req, res) {
    const { id } = req.params;
    try {
        const result = await reactivacionUserAdmin(id);
        res.json({
            result: result
        });
    } catch (error) {
        res.json({
            msg: error
        })
    }
}