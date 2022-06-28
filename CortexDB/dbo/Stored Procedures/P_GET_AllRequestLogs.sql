CREATE PROCEDURE [dbo].[P_GET_AllRequestLogs]
    @Request NVARCHAR(MAX),
    @Response NVARCHAR(MAX) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

	-- INIT
	SET @Response = '{}'

	-- EXECUTION
	SET @Response = (
		SELECT
			RequestLog.Id AS RequestId,
			RequestLog.UserId AS UserId,
			RequestLog.Result AS Result,
			RequestLog.Date AS RequestDate,
			RequestLog.Position AS Position,
			Users.Email AS Email,
			Users.Username AS Username
		FROM
			RequestLog LEFT OUTER JOIN
            Users ON RequestLog.UserId = Users.Id
		FOR JSON  PATH
	);
END

