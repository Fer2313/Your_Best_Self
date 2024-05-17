import {
  actualizarUser,
  changeEmail,
  changePassword,
  deleteUser,
  getAllUsers,
  getUserById,
  resetPassword,
  sendChangeEmail,
  sendDeleteUser,
  sendResetPassword,
  sendVerifyUser,
  verifyResetPassword,
  verifyUser,
} from "../handlers/user.js";

export async function getUserByIdRoute(req, res) {
  const { id } = req.params;
  try {
    const result = await getUserById(id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getAllUsersRoute(req, res) {
  try {
    const result = await getAllUsers(req);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function sendVerifyUserRoute(req, res) {
  const { email, verificationLink } = req.body;
  try {
    const { transporter, mailOptions } = await sendVerifyUser(
      email,
      verificationLink
    );
    await transporter.sendMail(mailOptions);
    res.json({ correo_status: "enviado" });
  } catch (error) {
    res.status(400).json({ correo_status: "fallido", error: error.message });
  }
}
export async function sendResetPasswordRoute(req, res) {
  const { email, verificationLink } = req.body;
  try {
    const { transporter, mailOptions } = await sendResetPassword(
      email,
      verificationLink
    );
    await transporter.sendMail(mailOptions);
    res.json({ correo_status: "enviado" });
  } catch (error) {
    res.status(400).json({ correo_status: "fallido", error: error.message });
  }
};

export async function VerifyUserRoute(req, res) {
  const { id, hashEmail } = req.body;
  try {
    const result = await verifyUser(id, hashEmail);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
export async function sendChangeEmailRoute(req, res) {
  const { email, newEmail, verificationLink } = req.body;
  try {
    const { transporter, mailOptions } = await sendChangeEmail(
      email,
      newEmail,
      verificationLink
    );
    await transporter.sendMail(mailOptions);
    res.json({ status: "ok", correo: "Correo enviado exitosamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
export async function changeEmailRoute(req, res) {
  const { token } = req.body;
  try {
    await changeEmail(token);
    res.json({
      status: "ok",
      correo: "Correo cambiado exitosamente",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function changePasswordRoute(req, res) {
  const { id, oldPassword, newPassword } = req.body
  try {
    await changePassword(id, oldPassword, newPassword)
    res.json({
      status: "ok",
      message: "contraseña actualizada"
    })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function verifyResetPasswordRoute(req, res) {
  const { token } = req.body;
  try {
    await verifyResetPassword(token)
    res.json({
      status: "ok",
      message: "Acceso autorizado"
    })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export async function resetPasswordRoute(req, res) {
  const { token, password } = req.body;
  try {
    await resetPassword(token, password)
    res.json({
      status: "ok",
      message: "Contraseña actualizada"
    })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export async function sendDeleteUserRoute(req, res) {
  const { email, verificationLink } = req.body;
  try {
    const { transporter, mailOptions } = await sendDeleteUser(email, verificationLink)
    await transporter.sendMail(mailOptions);
    res.json({
      status: "ok",
      message: "Email enviado"
    })
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteUserRoute(req, res) {
  const { token } = req.params
  try {
    const result = await deleteUser(token);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function actualizarUserRoute(req, res) {
  try {
    const result = await actualizarUser(req);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
