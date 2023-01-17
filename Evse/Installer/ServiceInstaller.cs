using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Evse.Helpers;
using Evse.Services;

namespace Evse.Installer
{
    public class ServiceInstaller : IInstaller
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IAccountTypeService, AccountTypeService>();
            services.AddScoped<IMailingService, MailingService>();
         
            services.AddScoped<ISequenceService, SequenceService>();
            services.AddScoped<IAccountGroupService, AccountGroupService>();
            services.AddScoped<IAccountPermissionService, AccountPermissionService>();
            services.AddScoped<IAccountRoleService, AccountRoleService>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<ISystemLanguageService, SystemLanguageService>();

            services.AddScoped<IXAccountService, XAccountService>();
            services.AddScoped<IXAccountGroupService, XAccountGroupService>();
            services.AddScoped<ISysMenuService, SysMenuService>();
         

            services.AddScoped<ILineService, LineService>();
            services.AddScoped<IReportService, ReportService> ();
            services.AddScoped<ICodePermissionService, CodePermissionService>();
         
            services.AddScoped<IStoredProcedureService, StoredProcedureService>();
            services.AddScoped<ICodeTypeService, CodeTypeService>();
            services.AddScoped<ISystemConfigService, SystemConfigService>();
          
        }
    }
}
