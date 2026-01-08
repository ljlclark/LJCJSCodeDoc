"use strict";
// PCodeDocNavEvents.js

// ***************
// Contains LJCNavPHPCodeDoc event handlers.
class NavEvents
{
	// Initializes an object instance with the provided values.
	constructor(contentFrame)
	{
		this.ContentFrame = contentFrame;
		this.PrevNavItem = null;
		this.NavItems = new CodeDocNavItems();
		this.CreateNavItems();
	}

	// Adds the HTML event handlers.
	AddEvents()
	{
		// Document Event Handlers.
		window.addEventListener("resize", this.WindowResize.bind(this))
		document.addEventListener("click", this.DocumentClick.bind(this));
		menuIco.addEventListener("click", this.MenuClick.bind(this));
		content.addEventListener("mouseenter", this.ContentMouseEnter.bind(this));
		this.menubar = document.getElementById("menubar");
		this.menuIco = document.getElementById("menuIco");
		this.sidebar = document.getElementById("sidebar");
		this.content = document.getElementById("content");
		this.menubar.style.display = "none";
		this.menuIco.style.display = "none";
		this.reducedWidth = false;
		this.WindowResize();
	}

	// 
	WindowResize()
	{
		let width = window.innerWidth;  // Webpage with scrollbars
		if (width < 800)
		{
			this.reducedWidth = true;
			this.menubar.style.display = "block";
			this.menuIco.style.display = "block";
			this.sidebar.style.display = "none";
			this.sidebar.style.width = "240px";  // use widest string width?
			this.content.style.width = "100%";
		}
		else
		{
			this.reducedWidth = false;
			this.menubar.style.display = "none";
			this.menuIco.style.display = "none";
			this.sidebar.style.display = "inline-block";
			this.sidebar.style.position = "relative";
			this.sidebar.style.width = "25%";  // use widest string width?
			this.content.style.width = "75%";
		}
	}

	// 
	MenuClick()
	{
		if (this.sidebar.style.display == "none")
		{
			this.sidebar.style.display = "inline-block";
			this.sidebar.style.position = "absolute";
		}
		else
		{
			this.sidebar.style.display = "none";
		}
	}

	// 
	ContentMouseEnter()
	{
		if (this.reducedWidth == true)
		{
			this.sidebar.style.display = "none";
		}
	}

	// Document "click" handler method.
	// event - The Target event.
	DocumentClick(event)
	{
		let srcElement = event.target;
		if ("navGroup" == srcElement.className
			|| "navItemGroup" == srcElement.className
			|| "navItem" == srcElement.className)
		{
			let navItem = this.NavItems.SearchName(srcElement.id);
			if (navItem != null)
			{
				if (this.ContentFrame != null)
				{
					this.ContentMouseEnter();
					this.ContentFrame.src = navItem.URL;
				}
			}

			if (this.PrevNavItem != null)
			{
				this.PrevNavItem.style.backgroundColor = "";
			}
			this.PrevNavItem = srcElement;
			srcElement.style.backgroundColor = "#d4dfff";
		}
	}

	// Creates the NavItem entries.
	CreateNavItems()
	{
		this.NavItems.Add("Projects", "..\LJCJSCodeDoc.html");

		// Common Libraries
		this.NavItems.Add("CommonCode", "LJCCommonLib.html");
	}
}