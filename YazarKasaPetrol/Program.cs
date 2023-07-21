namespace YazarKasaPetrol 
{
    public class Program 
    {
        public static WebApplication? TheApp { get; set; }

        private static void Main(string[] args) 
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddRazorPages();

            TheApp = builder.Build();

            // Configure the HTTP request pipeline.
            if (!TheApp.Environment.IsDevelopment())
            {
                TheApp.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                TheApp.UseHsts();
            }

            TheApp.UseHttpsRedirection();
            TheApp.UseStaticFiles();

            TheApp.UseRouting();

            TheApp.UseAuthorization();

            TheApp.MapRazorPages();

            TheApp.Run();
            

        }
    }
}