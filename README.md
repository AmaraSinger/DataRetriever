# README
Make sure you have the dotnet CLI installed and at least .NET sdk 6. (https://dotnet.microsoft.com/en-us/download/dotnet/6.0 - download installer for your OS, unless you're comfy building binaries). This should give you a command line tool called "dotnet."

cd into the same directory as the .csproj file and run "dotnet run." Go to the link it provides (probably something like 'https://localhost:5000')

The Data Retriver tool is rather easy to use once up and running. First, paste the link you'd like to scrape into the top box, and click "Send To Tool." Then, paste your selector (either CSS or XPath) into the second box and click "Parse!"

This will bring you to the results screen, which shows every element that was hit by your selector. All checked results will appear in the code snippets on the right, or download all results in either txt or csv format. You can add or remove checked results using the checkboxes next to each element the program hit during selection. Since the page was sent to via get request, the scraped url and your selector are stored in the page's url, so you can always reload and re-highlight every box. You could even copy-paste the link and send it to someone.