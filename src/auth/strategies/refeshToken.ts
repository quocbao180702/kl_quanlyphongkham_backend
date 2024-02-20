import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField("refresh"),
            ignoreExpiration: false,
            secretOrKey: `${process.env.jwt_secret}`,
            logging: true,
        });
    }

    async validate(payload: any) {
        return { user: payload.sub, username: payload.username };
    }
}