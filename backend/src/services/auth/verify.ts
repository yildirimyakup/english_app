import jwt from "jsonwebtoken";
import User from "../../models/User.js";

// Define a type for the decoded token to ensure type safety.
interface DecodedToken {
  id: string;
}

export const verifyEmail = async (
  token: string
): Promise<{ message: string }> => {
  try {
    if (!token) {
      throw new Error("Token is missing.");
    }

    // Explicitly type the decoded result for better type safety.
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedToken;

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new Error("User not found.");
    }

    if (user.verified) {
      return { message: "✅ Email has already been verified." };
    }

    user.verified = true;
    await user.save();

    return { message: "✅ Email verified successfully! You can now log in." };
  } catch (error) {
    if (error instanceof Error) {
      // Re-throw specific errors for better error handling on the client side.
      throw new Error(error.message);
    }
    // Generic server error for any other unexpected issues.
    throw new Error(
      "An unexpected server error occurred during email verification."
    );
  }
};
