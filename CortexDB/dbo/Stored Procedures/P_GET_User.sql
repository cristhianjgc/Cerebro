CREATE PROCEDURE [dbo].[P_GET_User]
    @Request NVARCHAR(MAX),
    @Response NVARCHAR(MAX) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

	-- INIT
	SET @Response = '{}'

	-- DECLARE
	DECLARE @UserId NVARCHAR(50) = JSON_VALUE(@Request,'$.UserId')

	-- EXECUTION
	SET @Response = (
		SELECT
			Id AS UserId,
			Email AS Email,
			Nickname AS Nickname,
			Username AS Username,
			CreatedAt AS CreatedAt
		FROM
            Users
		WHERE
			Id = @UserId
		FOR JSON  PATH, WITHOUT_ARRAY_WRAPPER
	);
END

