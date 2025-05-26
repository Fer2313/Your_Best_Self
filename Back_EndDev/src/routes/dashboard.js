import {
  deleteUserAdmin,
  reactivacionUserAdmin,
} from "../handlers/dashboard.js";

export async function deleteUserAdminRoute(req, res) {
  const { id } = req.params;
  try {
    const result = await deleteUserAdmin(id);
    res.status(200).json({
      msg: `Usuario eliminado con exito id ${id}`,
      result: result,
    });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
}

export async function reactivationUserAdminRoute(req, res) {
  const { id } = req.params;
  try {
    const result = await reactivacionUserAdmin(id);
    res.status(200).json({
      result: result,
    });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
}
