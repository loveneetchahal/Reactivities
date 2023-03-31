using Domain;
using Persistence;

namespace API.Extensions;

public static class IdentityServiceExtension
{
   public static IServiceCollection AddIdentityServices(this IServiceCollection services)
   {
       services.AddIdentityCore<AppUser>(opt =>
       {
           opt.User.RequireUniqueEmail = true;
           opt.Password.RequireNonAlphanumeric = true;
       })
           .AddEntityFrameworkStores<DataContext>();

       services.AddAuthentication();
       
       return services;
   }
}