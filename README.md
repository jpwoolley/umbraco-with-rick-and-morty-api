# Umbraco Project Integrating the Rick and Morty API
This is an Umbraco 15 project that integrates with the [Rick and Morty API](https://rickandmortyapi.com/) to fetch character data and programmatically create content nodes via Umbraco’s Content Service. It includes a custom Vite-based dashboard to trigger the import and deletion of character data from the Umbraco Backoffice.

---

## Setting up the project and using it
### Cloning and running
1. Clone the project to your computer.
2. CD in to the project folder.
3. Run "dotnet restore".
4. Run "dotnet run".
5. When the project has finished building, you can browse to the site. The site address should be https://localhost:44308 as per the launchSettings.json file.
(Note: if port 44308 isn't working for the site, keep an eye on the ouput for the port which gets assigned instead. You should see a line which resembles "Now listening on: https://localhost:...". Use that port instead)

The project includes a pre-configured database so setup is not neccessary.

### Sign in to Backoffice
You can use the following details to login to Backoffice:

Username: mail@example.com
Password: MyOtherPasswordIsMoreSecure1234!

### Characters
The site will already have a small collection of characters imported which you can view at /characters. You can manage this collection - Import additional characters or delete them - from the Dashboard.

---

## Custom Developments
The custom developments in this project make use of the following languages/tools:
- C#/.NET 8
- Vite (for building extensions, [as recommended by Umbraco](https://docs.umbraco.com/umbraco-cms/customizing/development-flow/vite-package-setup))
- HTML5, CSS3 and TypeScript
 
Wherever HTML is written (custom dashboard, templates), HTML5 semantic elements and [ARIA labels](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides) have been used to:
- Improve accessibility for users with accessibility needs
- Improve the readability and cleanliness of the code itself

Try...Catch statements are uses for safely carrying out operations. Logging is provided using an instance of ILogger which is injected into relevant classes.

### Rick and Morty Custom Dashboard
This is a custom dashboard extension for the Umbraco Backoffice. It's accessible at: '/umbraco/section/content/dashboard/rick-and-morty-dashboard'. As per Umbraco's recommendation, this is designed as a Vite package and is written using TypeScript.

The dashboard features a couple of buttons - labelled 'Import' and 'Delete' - which are used to trigger the mechanisms for managing the Character content nodes.

The user receives visual feedback after clicking the buttons:
- Buttons are disabled during the process to prevent repeat submissions
- Status text appears to show progress
- Alerts notify the user on completion

### RickAndMortyController
This is a simple API controller which extends the Microsoft.AspNetCore.Mvc.Controller class. It takes an instance of RickAndMortyContentService and ILogger using dependency injection.

The controller exposes two endpoints for triggering the Import and Delete mechanisms. These endpoints are used by the buttons in the custom dashboard. These endpoints are kept secure by using /umbrace/ at the base of their routes: this means that the endpoints can only be accessed by users already authenticated to the Backoffice.

### RickAndMortyContentService
#### Overview
This service class performs the bulk of the integration work. 

Using dependency injection, it takes: 
- an instance of HttpClient for communicating with the Ricky and Morty API
- an instance of IContentService for managing the Character content nodes
- an instance of ILogger for logging

The service is responsible the following:
- Fetches character data from '/character' endpoint of the Rick and Morty API using 'HttpClient'
- Deserializes the received response into immutable C# record types (see below for more info)
- Processes the incoming data and skips any duplicates. Duplicate characters are recognised by checking the 'id' value of incoming characters and comparing it with the 'id' property on existing characters.
- Uses `IContentService` to create/delete content nodes in Umbraco

#### Naming of new content nodes and stores properties
The name of the newly created character content nodes is set to a combination of the 'name' and 'id' properties (e.g. "rick-sanchez-1"). The 'name' property provides human-readable meaning and the 'id' value ensures that the name is unique.

In addition to 'name' and 'id', the following values are retrieved and stored:
- Status
- Species
- Type (character subspecies)
- Gender
- Origin
- Location
- Created
- Episode Count
(Note on Episode Count: in the Ricky And Morty API, this is an array of strings whith those strings being URL's for the corresponding episode page. In my app, this is instead an int value which represents the number of episodes the character has appeared in.)

### Models used for deserialising
The models can be found in the project under /Models. 

They're implemented as immutable C# record types and follow the schema of the Rick and Morty API. Immutability is achieved by defining properties with GET and INIT methods, but not a SET method. Additionally, IReadOnlyList types are used for collections. 

Each model includes a link to the relevant section of the Rick and Morty API documentation used for defining the class properties.

### Document Types
There are several Document Types and related templates defined in the Backoffice. These are:
- Home Page – For the site's landing page
- Characters – A container node for all character items
- Character Item – Represents an imported character; these are created as child nodes under the **Characters** node.

Each Document Type is associated with a corresponding template to control how content is rendered on the front end. A Master emplate is used to provide a consistent structure across all the content pages. Additionally, the `<nav>` element is defined as a **Partial Views** and included in the Master template.