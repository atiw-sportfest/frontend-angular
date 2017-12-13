<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:output method="text" indent="yes"/>

  <xsl:template match="//snapshotVersion">
      <xsl:if test="extension = 'jar' and not(classifier)">
          <xsl:value-of select="value" />
      </xsl:if>
  </xsl:template>

  <xsl:template match="text()"/>

</xsl:stylesheet>
