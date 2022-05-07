var checkedResults = [];
var activeLanguage = 'python';

function ToggleResult(checkbox, index)
{
    var span = checkbox.parentNode.getElementsByTagName('span')[0];
    var text = span.innerHTML;
    // remove the \t and \n and \r characters
    text = text.replace(/\t/g, '');
    text = text.replace(/\n/g, '');
    text = text.replace(/\r/g, '');
    if (text.charAt(text.length - 1) == ' ')
    {
        text = text.substring(0, text.length - 1);
    }

    if (checkbox.checked)
    {
        checkedResults.push(text);
    }
    else
    {
        checkedResults.splice(index, 1);
    }

    RefreshResults();
}


function ExportToTxt()
{
    // make a txt file and download it to the client
    var text = checkedResults.join('\n\n');
    var blob = new Blob([text], { type: 'text/plain' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'results.txt';
    a.click();
    window.URL.revokeObjectURL(url);
}

function ExportToCSV()
{
    // make a csv file that splits the results into rows and columns
    console.log("ExportToCSV");
}

function SetActiveLanguage(language)
{
    activeLanguage = language;
    RefreshResults();
    console.log('activeLanguage: ' + activeLanguage);
}

function RefreshResults()
{
    if (checkedResults.length > 0)
    {
        if (activeLanguage == 'python')
        {
            CreatePythonList();
            CreatePythonDictionary();
        }
        else if (activeLanguage == 'csharp')
        {
            CreateCSharpArray();
            CreateCSharpList();
            CreateCSharpDictionary();
        }
        else if (activeLanguage == 'java')
        {
            CreateJavaArray();
            CreateJavaList();
            CreateJavaDictionary();
        }
    }
}

// Formatting functions
function CreatePythonList()
{
    var pythonList = '[' + checkedResults.join(', ') + ']';
    console.log("pythonList: " + pythonList);
    document.getElementById('pythonList').innerHTML = pythonList;
}

function CreatePythonDictionary()
{
    // every odd element is the key, every even element is the value
    var pythonDictionary = '{';
    for (var i = 0; i < checkedResults.length; i += 2)
    {
        pythonDictionary += '"' + checkedResults[i] + '": "' + checkedResults[i + 1] + '", ';
    }
    pythonDictionary = pythonDictionary.substring(0, pythonDictionary.length - 2);
    pythonDictionary += '}';
    console.log("pythonDictionary: " + pythonDictionary);
    document.getElementById('pythonDictionary').innerHTML = pythonDictionary;
}

function CreateCSharpArray()
{
    var cSharpArray = 'new string[] { ' + checkedResults.join(', ') + ' }';
    console.log("cSharpArray: " + cSharpArray);
    document.getElementById('cSharpArray').innerHTML = cSharpArray;
}

function CreateCSharpList()
{
    var cSharpList = 'new List<string> { ' + checkedResults.join(', ') + ' }';
    console.log("cSharpList: " + cSharpList);
    document.getElementById('cSharpList').innerHTML = cSharpList;
}

function CreateCSharpDictionary()
{
    // every odd element is the key, every even element is the value
    var cSharpDictionary = 'new Dictionary<string, string> { ';
    for (var i = 0; i < checkedResults.length; i += 2)
    {
        cSharpDictionary += '{"' + checkedResults[i] + '", "' + checkedResults[i + 1] + '"}, ';
    }
    cSharpDictionary = cSharpDictionary.substring(0, cSharpDictionary.length - 2);
    cSharpDictionary += '}';
    console.log("cSharpDictionary: " + cSharpDictionary);
    document.getElementById('cSharpDictionary').innerHTML = cSharpDictionary;
}

function CreateJavaArray()
{
    var javaArray = 'new String[] { ' + checkedResults.join(', ') + ' }';
    console.log("javaArray: " + javaArray);
    document.getElementById('javaArray').innerHTML = javaArray;
}

function CreateJavaList()
{
    var javaList = 'new ArrayList<String>() {{ ' + checkedResults.join(', ') + ' }}';
    console.log("javaList: " + javaList);
    document.getElementById('javaList').innerHTML = javaList;
}

function CreateJavaDictionary()
{
    // every odd element is the key, every even element is the value
    var javaDictionary = 'new HashMap<String, String>() {{ ';
    for (var i = 0; i < checkedResults.length; i += 2)
    {
        javaDictionary += '{"' + checkedResults[i] + '", "' + checkedResults[i + 1] + '"}, ';
    }
    javaDictionary = javaDictionary.substring(0, javaDictionary.length - 2);
    javaDictionary += '}';
    console.log("javaDictionary: " + javaDictionary);
    document.getElementById('javaDictionary').innerHTML = javaDictionary;
}