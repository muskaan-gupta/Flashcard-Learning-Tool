import { Router } from "express";
import { verifiedJWT } from "../middleware/auth.middleware.js";
import {
  registeruser,
  loginUser,
  logOutUser,
  refreshAccessToken,
  updatePassword,
  updateOtherDetails,
  updateAvatar,
  updateCoverImage,
  getCurrentUser,
  getUserProfile,
  getUserDashboardData,
} from "../controllers/userController.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();
router.route("/dashboard-data").get(verifiedJWT, getUserDashboardData);
router.route("/register").post(registeruser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifiedJWT, logOutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/updatePassword").post(verifiedJWT, updatePassword);
router.route("/updateOtherDetails").patch(verifiedJWT, updateOtherDetails);
router.route("/getCurrentUser").get(verifiedJWT, getCurrentUser);

router
  .route("/updateavatar")
  .patch(verifiedJWT, upload.single("avatar"), updateAvatar);

router
  .route("/updateCoverImage")
  .patch(verifiedJWT, upload.single("coverImage"), updateCoverImage);

router.route("/c/:username").get(getUserProfile);

export default router;