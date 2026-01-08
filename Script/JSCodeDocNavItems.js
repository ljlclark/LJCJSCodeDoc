"use strict";
// PCodeDocNavItems.js

// ***************
/// <summary>Contains CityDetail event handlers.</summary>
class CodeDocNavItem
{
	// Initializes an object instance with the provided values.
	constructor(name, url)
	{
		this.Name = name;
		this.URL = url;
	}

	// Clones this object.
	Clone()
	{
		return new CodeDocNavItem(this.Name, this.URL);
	}
}

// ***************
/// <summary>Represents a collection of NavItem objects.</summary>
class CodeDocNavItems
{
	// Initializes an object instance.
	constructor()
	{
		this.Items = [];
	}

	// Creates and adds a strong typed item to the collection.
	// Returns the added item.
	Add(name, url)
	{
		let item = new CodeDocNavItem(name, url);
		this.Items.push(item);
		return item;
	}

	// Clones this object.
	Clone()
	{
		let retValue = new CodeDocNavItems();
		let len = this.Items.length;
		for (let index = 0; index < len; Index++)
		{
			let item = this.Items[index];
			let newItem = item.Clone();
			retValue.Items.push(newItem);
		}
		return retValue;
	}

	// 
	Get(index)
	{
		return this.Items[index];
	}

	// Returns an item from the collection by Name.
	FindName(name)
	{
		let retValue = null;

		if (Common.HasValue(name))
		{
			let len = this.Items.length;
			for (let index = 0; index < len; index++)
			{
				let item = this.Items[index];
				if (item.Name != null
					&& 0 == item.Name.localeCompare(name))
				{
					retValue = item;
					break;
				}
			}
		}
		return retValue;
	}

	// Returns an item from the collection by Name.
	SearchName(name, threshold = 10)
	{
		var retValue;

		if (Common.HasValue(name))
		{
			if (this.Items.length < threshold)
			{
				retValue = this.FindName(name);
			}
			else
			{
				let index = Common.BinarySearch(this.Items,
					function (compare, compareTo)
					{
						// Sort
						return compare.Name.localeCompare(compareTo.Name);
					},
					function (item)
					{
						// Compare
						return item.Name.localeCompare(name);
					}
				);
				if (index > -1)
				{
					retValue = this.Items[index];
				}
			}
		}
		return retValue;
	}
}
