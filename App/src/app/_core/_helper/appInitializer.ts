import { AuthEngineerService } from "../_service/auth-engineer.service";
import { AuthLandlordService } from "../_service/auth-landlord.service";
import { AuthService } from "../_service/auth.service";

export function appInitializer(authService: AuthService,authLandlordService: AuthLandlordService,authEngineerService: AuthEngineerService) {
    return () =>
      new Promise((resolve, reject) => {
            //console.log('refresh token on app start up');
            const pathname = document.location.pathname;
            if (pathname.indexOf('mobile/landlord') !== -1) { 
              authLandlordService?.refreshTokenLandlord().subscribe().add(resolve);

            }
           else  if (pathname.indexOf('mobile/landlord') !== -1) { 
            authEngineerService?.refreshTokenEngineer().subscribe().add(resolve);
            } 
            else
            {
              authService?.refreshToken().subscribe().add(resolve);
            }
        });
}
