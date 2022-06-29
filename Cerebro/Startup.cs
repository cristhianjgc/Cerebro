using Cerebro.Models;
using Microsoft.AspNetCore.SpaServices.AngularCli;

namespace Cerebro
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; set; }
        
        public void ConfigureServices(IServiceCollection services)
        {
            // AppSettings
            services.Configure<GlobalSettings>(Configuration);

            services.AddSession();
            services.AddSignalR();
            services.AddControllersWithViews(options =>
            {
                options.AllowEmptyInputInBodyModelBinding = true;
            }).AddNewtonsoftJson();
            services.AddCors(o => o.AddPolicy("CorsPolicy", builder =>
            {
                builder
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowAnyOrigin();
            }));

            services.AddSpaStaticFiles(config =>
            {
                config.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseRouting();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseCors("CorsPolicy");
            app.UseHttpsRedirection();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(name: "default", pattern: "{controller}/{action}/{id?}");
                endpoints.MapHub<NotifyHub>("/notify");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer("start");
                }
            });
        }
    }
}
