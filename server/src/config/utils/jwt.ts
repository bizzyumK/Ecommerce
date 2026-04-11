import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
interface GenerateTokenOption {
    id: string,
    isAdmin: boolean,
    secret_key: string,
    expires_in: StringValue | number
};

export function generateToken(create: GenerateTokenOption) {
    return jwt.sign(
        { id: create.id, isAdmin: create.isAdmin },
        create.secret_key,
        {
            expiresIn: create.expires_in
        }
    );
}
