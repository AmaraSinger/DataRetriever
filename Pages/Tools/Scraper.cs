using HtmlAgilityPack;
using css2xpath;
using System.Net;

namespace DataRetriever.Scraping
{
	public class Scraper
	{
		public List<HtmlNode>? currentHtml;

		public Scraper()
		{

		}

		public void ProcessUrl(string url)
		{
			Task<string> html = GetUrl(url);
			List<HtmlNode> elems = ConvertElemsToList(html.Result);
			currentHtml = elems;
			string[] lines = html.Result.Split('\n');
		}

		private static async Task<string> GetUrl(string url)
		{
			// Async function to get the html from a page. Made it a task so the webpage doesn't hang quite as bad

			HttpClient connector = new();
			ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls13; // avoid handshake errors
			connector.DefaultRequestHeaders.Accept.Clear(); // clear headers in case we want to add our own
			var response = connector.GetStringAsync(url); // get response
			return await response; // await and return
		}

		private List<HtmlNode> ConvertElemsToList(string html)
		{
			// Function to convert html to a list of elements

			HtmlDocument htmlDocument = new HtmlDocument(); // create a blank doc to write to
			htmlDocument.LoadHtml(html); // load the scraped html in

			// get *all* elements in page
			var elems = htmlDocument.DocumentNode.Descendants();
			List<HtmlNode> elemList = new(); // create a list to store the elements in
			foreach (var elem in elems)
			{
				elemList.Add(elem); // add the inner text of each element to the list
			}
			return elemList; // return the list
		}

		public List<string> SelectorParse(List<HtmlNode> elems, string CSSSelector)
		{
			// Function to parse html using a CSS selector
			
			List<string> elemList = new(); // create a list to store the elements in
			if (CSSSelector.Contains("/")) // if its already an xpath selector
			{
				foreach (var elem in elems)
				{
					var elemText = elem.SelectSingleNode(CSSSelector); // select the element using the xpath
					if (elemText != null)
					{
						elemList.Add(elemText.InnerText); // add the inner text of the element to the list
					}
				}
			}
			else // must be just cssselector
			{
				string xpath = Converter.CSSToXPath(CSSSelector); // convert the CSS selector to an xpath
				foreach (var elem in elems)
				{
					var elemText = elem.SelectSingleNode(xpath); // select the element using the xpath
					if (elemText != null)
					{
						elemList.Add(elemText.InnerText); // add the inner text of the element to the list
					}
				}
			}
			return elemList; // return the list
		}

		public List<HtmlNode> GetNodeListFromUrl(string url)
		{
			// Function to get a list of elements from a url using a CSS selector

			Task<string> html = GetUrl(url);
			List<HtmlNode> elems = ConvertElemsToList(html.Result);
			return elems;
		}

		public string GetHtmlFromUrl(string url)
		{
			// Function to get the html from a url

			Task<string> html = GetUrl(url);
			return html.Result;
		}
	}
}

