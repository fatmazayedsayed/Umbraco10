/*
 * TinyMce Mark-Plugin to wrap text with <mark>-tags.
 */
(function () {
    tinymce.create('tinymce.plugins.NewsletterStudioMergeFields', {
        init: function (ed, url) {

            ed.addButton('nsMergeFields', {
                type: 'menubutton',
                text: 'Fields',
                tooltip : 'Inserts a Merge Field',
                icon: false,
                menu: function () {

                    if (!NewsletterStudio.Utilities.isDefined(NewsletterStudio.RichTextEditor)) {
                        return [];
                    }
                    
                    /**
                     * Creates a menu option for the TinyMCE-menu based on a field.
                     * @param {any} field
                     */
                    var createMenuOptionFromField = function (field) {
                        var opt = {
                            text: field.text,
                            onclick: function () {
                                
                                var wrappedField = NewsletterStudio.Utilities.MergeFields.WrapPlaceholderAsMergeField(field.placeholder);
                                
                                ed.insertContent(wrappedField);
                            }

                        }

                        if (!NewsletterStudio.Utilities.isNullOrEmpty(field.tooltip)) {
                            opt.tooltip = field.tooltip;
                        }

                        return opt;
                    };
                    
                    // Reads fields from global state variable that we update each time we load a new email-template.
                    var fieldsFromServer = NewsletterStudio.RichTextEditor.State.mergeFields;
                    var arrMenuItems = [];

                    // Create a list of "categories" if any
                    var arrCategories = [];

                    fieldsFromServer.forEach(function (field) {
                        
                        if (!NewsletterStudio.Utilities.isNullOrEmpty(field.groupText))
                        {    
                            if (arrCategories.indexOf(field.groupText) == -1) {
                                arrCategories.push(field.groupText);
                            }
                        }
                    });


                    var hasMoreThanOneCategory = arrCategories.length > 1;

                    if (hasMoreThanOneCategory) {
                        // We have more than one category, lets create menu-options for them

                        arrCategories.forEach(function (groupText) {
                            var root = {
                                text: groupText,
                                menu: []
                            }

                            // get all fields for this group
                            var fieldsInGroup = fieldsFromServer.filter(function (field) {
                                return field.groupText == groupText;
                            });

                            fieldsInGroup.forEach(function (field) {
                                root.menu.push(createMenuOptionFromField(field));
                            });

                            arrMenuItems.push(root);

                        }); 

                        // Append any field without group
                        var fieldsWithoutGroup = fieldsFromServer.filter(function (field) {
                            return NewsletterStudio.Utilities.isNullOrEmpty(field.groupText);
                        });

                        fieldsWithoutGroup.forEach(function (field) {
                            arrMenuItems.push(createMenuOptionFromField(field));
                        });


                    }
                    else {
                        // Avoid category, just add all options directlly
                        
                        fieldsFromServer.forEach(function (field) {

                            arrMenuItems.push(createMenuOptionFromField(field));

                        });


                    }

                    return arrMenuItems;

                }()

            });

        }
    });

    // Register plugin
    tinymce.PluginManager.add('nsMergeFields', tinymce.plugins.NewsletterStudioMergeFields);
})();
