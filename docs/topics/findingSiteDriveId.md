# How to find your Sharepoint Site and Drive ID
At the time of writing there is no **good** way to get these values. So what follows is a work-around process.

## SiteId
1. Open the Sharepoint UI for the site you're interested in (ie https://msftfuturesecureai.sharepoint.com/sites/FSAI-MQG/)
2. In your browser, open "View Source"
3. Search the source for `siteId` and look immediately after it.
4. The SiteId is a GUID and will look something like "89cb90aa-7977-412d-8215-31c74db72d7b"

## DriveID
1. In the Sharepoint UI, create a workbook. New > Workbook
2. Close the file and back in Sharepoint refresh the page
3. Open your web browsers Inspect tool
4. Right click on the new workbook and Click "Details"
5. In the inspect tool, swap to the "Network" table and filter the view vy "Fetch/XHR"
6. Find the request to the Graph API. It will look like this: 
  `https://msftfuturesecureai.sharepoint.com/_api/v2.1/drives/b!qpDLiXd5LUGCFTHHTbcte07zDZGO-jpHhga5szhvDwEvhFVvV24OSrAv5WljW1aA/items/01LRCMNGPGDA4PSPHWF5AZN45DNO37BP3Z?%24select=id%2Creactions%2Ctrending&%24expand=insights(%24expand%3DkeyPoints)%2Canalytics(%24expand%3DallTime(%24expand%3Dactivities))%2CrecommendedActionSet(%24expand%3DnonAggregatedRecommendedActions%2CaggregatedEditRecommendedAction(%24expand%3DimportantActorsAndActivities))%2CconversationSet(%24expand%3DemailConversations(%24expand%3Dparticipants)%2CmeetingConversations(%24expand%3Dparticipants)%2CteamsConversations(%24expand%3Dparticipants))`
7. Note the portion between `/drives/` and `/items`/. This is your driveId. In the above example it is `b!qpDLiXd5LUGCFTHHTbcte07zDZGO-jpHhga5szhvDwEvhFVvV24OSrAv5WljW1aA`.



