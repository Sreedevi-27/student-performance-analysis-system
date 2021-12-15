package auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;

public class AuthJWT {
    private static final String SECRET = "S3CR3T";
    private static final String ISSUER = "auth0";
    private static final Algorithm algorithm = Algorithm.HMAC256(SECRET);

    public static String getToken(Roles role) {
        return JWT.create().withIssuer(ISSUER).withClaim("ROLE", role.toString()).sign(algorithm);
    }

    public static void verifyToken(String token) {
        try {
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(ISSUER)
                    .build();
            verifier.verify(token);
        } catch (JWTVerificationException e) {
            System.out.println("token invalid");
            throw e;
        }
    }
}
