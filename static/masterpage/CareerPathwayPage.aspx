<%@ Page language="C#"   Inherits="Microsoft.SharePoint.Publishing.PublishingLayoutPage,Microsoft.SharePoint.Publishing,Version=15.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePointWebControls" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="PublishingWebControls" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="PublishingNavigation" Namespace="Microsoft.SharePoint.Publishing.Navigation" Assembly="Microsoft.SharePoint.Publishing, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<asp:Content ContentPlaceholderID="PlaceHolderAdditionalPageHead" runat="server">
	<SharePointWebControls:CssRegistration name="<% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/pagelayouts15.css %>" runat="server"/>
	<PublishingWebControls:EditModePanel runat="server">
		<!-- Styles for edit mode only-->
		<SharePointWebControls:CssRegistration name="<% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/editmode15.css %>"
			After="<% $SPUrl:~sitecollection/Style Library/~language/Themable/Core Styles/pagelayouts15.css %>" runat="server"/>
	</PublishingWebControls:EditModePanel>

    <meta name="viewport" content="width=device-width, initial-scale=1">
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderPageTitle" runat="server">
	<SharePointWebControls:ListProperty Property="Title" runat="server"/> - <SharePointWebControls:FieldValue FieldName="Title" runat="server"/>
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderPageTitleInTitleArea" runat="server">
	<SharePointWebControls:FieldValue FieldName="Title" runat="server" />
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderTitleBreadcrumb" runat="server"> <SharePointWebControls:ListSiteMapPath runat="server" SiteMapProviders="CurrentNavigationSwitchableProvider" RenderCurrentNodeAsLink="false" PathSeparator="" CssClass="s4-breadcrumb" NodeStyle-CssClass="s4-breadcrumbNode" CurrentNodeStyle-CssClass="s4-breadcrumbCurrentNode" RootNodeStyle-CssClass="s4-breadcrumbRootNode" NodeImageOffsetX=0 NodeImageOffsetY=289 NodeImageWidth=16 NodeImageHeight=16 NodeImageUrl="/_layouts/15/images/fgimg.png?rev=23" HideInteriorRootNodes="true" SkipLinkText="" /> </asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderPageDescription" runat="server">
	<SharePointWebControls:ProjectProperty Property="Description" runat="server"/>
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderBodyRightMargin" runat="server">
	<div height=100% class="ms-pagemargin"><IMG SRC="/_layouts/images/blank.gif" width=10 height=1 alt=""></div>
</asp:Content>
<asp:Content ContentPlaceHolderId="PlaceHolderMain" runat="server">
   
   <div class="popup-container">
        <div class="popup-content">
            <div  class="btn-close close-popup">x</div>
            <div class="popup-inner-content">
                <h2 id="popup-title"></h2>
                <ul id="popup-list" class="pathway-sections list-unstyled row">
                </ul>

            </div>
        </div>
   </div>

    <div class="sharepoint-banner-toggle js-toggle-admin">
        Admin
    </div>
    <header>
        <div class="header container">
            <div class="row">
                <div class="col-md-3 col-lg-4">
                <a href="https://uat-ext.kier.group/sites/hrcareerpathways/Pages/index.aspx">
                    <img class="logo" src="/sites/hrcareerpathways/_catalogs/masterpage/images/logo.png" alt="Kier">
                </a>
                </div>
                <div class="col-md-9 col-lg-8 top-nav">
                    <div class="d-flex flex-column flex-md-row justify-content-end">

                        <div class="d-flex link-container order-1 order-md-0 justify-content-around">
                            <a href="#" class="nav-link subnav-link js-toggle-subnav">Career Pathways</a>
                            <a href="https://uat-ext.kier.group/sites/hrcareerpathways/Pages/Career-Stories-Landing.aspx" class="nav-link">Career Stories</a>
                        </div>
                        <div class="search order-0 order-md-1">
                            <input type="text" name="search-input" id="search-input" placeholder="Search a role">
                            <img src="/sites/hrcareerpathways/_catalogs/masterpage/images/search.png">

                            <div class="sub-search">
                                <a href="#" class="nav-search-result">
                                    <img src="/sites/hrcareerpathways/_catalogs/masterpage/images/group-finance.png" />
                                    <span>Group Financial Accountant</span>
                                </a>
                                
                                <a href="#" class="nav-search-result">
                                    <img src="/sites/hrcareerpathways/_catalogs/masterpage/images/group-finance.png" />
                                    <span>Group Financial Accountant</span>
                                </a>
                                
                                <a href="#" class="nav-search-result">
                                    <img src="/sites/hrcareerpathways/_catalogs/masterpage/images/group-finance.png" />
                                    <span>Group Financial Accountant</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <section class="subnav">
            <div class="container">
                <div class="d-flex flex-column flex-lg-row text-center">
                    <div class="p-2 subnav-item  align-self-center">
                        <a href="https://uat-ext.kier.group/sites/hrcareerpathways/Pages/Job-Role-Landing.aspx?ids=2" class="row">
                            <div class="col-sm-3 align-self-center">
                                <img src="/sites/hrcareerpathways/_catalogs/masterpage/images/operational-finance.png" alt="Operational Finance">
                            </div>
                            <div class="col-sm-9 align-self-center text-left">
                                Operational Finance
                            </div>
                        </a>
                    </div>
                    <div class="p-2 subnav-item  align-self-center">
                        <a href="https://uat-ext.kier.group/sites/hrcareerpathways/Pages/Job-Role-Landing.aspx?ids=3" class="row">
                            <div class="col-sm-3 align-self-center">
                                <img src="/sites/hrcareerpathways/_catalogs/masterpage/images/fssc.png" alt="FSSC">
                            </div>
                            <div class="col-sm-9 align-self-center text-left">
                                Finance Shared Service Centre (FSSC)
                            </div>
                        </a>
                    </div>
                    <div class="p-2 subnav-item  align-self-center">
                        <a href="https://uat-ext.kier.group/sites/hrcareerpathways/Pages/Job-Role-Landing.aspx?ids=1" class="row">
                            <div class="col-sm-3 align-self-center">
                                <img src="/sites/hrcareerpathways/_catalogs/masterpage/images/group-finance.png" alt="Group Finance">
                            </div>
                            <div class="col-sm-9 align-self-center text-left">
                                Group Finance and Technical Specialisms
                            </div>
                        </a>
                    </div>
                </div>
                <div class="row text-right">
                    <div class="col">
                        <a href="#" class="close-subnav js-toggle-subnav">Close navigation</a>
                    </div>
                </div>
            </div>
        </section>
    </header>

    <WebPartPages:WebPartZone runat="server" Title="<%$Resources:cms,WebPartZoneTitle_Header%>" ID="PageLayout"/>
     

       <footer>
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-6">
                    <h4>Career Pathways</h4>
                    <ul>
                        <li>
                            <a href="https://uat-ext.kier.group/sites/hrcareerpathways/Pages/Job-Role-Landing.aspx?ids=2">Operational Finance</a>
                        </li>
                        <li>
                            <a href="https://uat-ext.kier.group/sites/hrcareerpathways/Pages/Job-Role-Landing.aspx?ids=3">Financial Shared Service Centre FSSC</a>
                        </li>
                        <li>
                            <a href="https://uat-ext.kier.group/sites/hrcareerpathways/Pages/Job-Role-Landing.aspx?ids=1">Group Finance and Technical Specialisms</a>
                        </li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h4>Career Stories</h4>
                    <ul>
                        <li>
                            <a href="">Lee Woodall</a>
                        </li>
                        <li>
                            <a href="">David Hodson</a>
                        </li>
                        <li>
                            <a href="">Ross Gallagher</a>
                        </li>
                        <li>
                            <a href="">Emma Tarrant</a>
                        </li>
                        <li>
                            <a href="">Ian Chapman</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>
				
</asp:Content>
