<GameProjectFile>
  <PropertyGroup Type="Layer" Name="BattleLayer" ID="df56f77a-5216-4587-a690-9c3facf31085" Version="2.3.0.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="151" Speed="0.4000">
        <Timeline ActionTag="-1447462100" Property="ActionValue">
          <InnerActionFrame FrameIndex="0" Tween="False" InnerActionType="LoopAction" CurrentAniamtionName="stand" SingleFrameIndex="0" />
          <InnerActionFrame FrameIndex="151" Tween="False" InnerActionType="LoopAction" SingleFrameIndex="0" />
        </Timeline>
        <Timeline ActionTag="-1447462100" Property="Scale">
          <ScaleFrame FrameIndex="0" X="1.0000" Y="1.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="151" X="1.0000" Y="1.0000">
            <EasingData Type="-1">
              <Points>
                <PointF />
                <PointF />
                <PointF X="1.0000" Y="1.0000" />
                <PointF X="1.0000" Y="1.0000" />
              </Points>
            </EasingData>
          </ScaleFrame>
        </Timeline>
        <Timeline ActionTag="-1447462100" Property="RotationSkew">
          <ScaleFrame FrameIndex="0" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="151" X="0.0000" Y="0.0000">
            <EasingData Type="-1">
              <Points>
                <PointF />
                <PointF />
                <PointF X="1.0000" Y="1.0000" />
                <PointF X="1.0000" Y="1.0000" />
              </Points>
            </EasingData>
          </ScaleFrame>
        </Timeline>
        <Timeline ActionTag="1553465698" Property="ActionValue">
          <InnerActionFrame FrameIndex="0" Tween="False" InnerActionType="LoopAction" CurrentAniamtionName="attack" SingleFrameIndex="0" />
          <InnerActionFrame FrameIndex="54" Tween="False" InnerActionType="LoopAction" CurrentAniamtionName="attack" SingleFrameIndex="0" />
        </Timeline>
        <Timeline ActionTag="1553465698" Property="Position">
          <PointFrame FrameIndex="0" X="29.4898" Y="32.7662">
            <EasingData Type="-1">
              <Points>
                <PointF />
                <PointF />
                <PointF X="1.0000" Y="1.0000" />
                <PointF X="1.0000" Y="1.0000" />
              </Points>
            </EasingData>
          </PointFrame>
        </Timeline>
        <Timeline ActionTag="1553465698" Property="Scale">
          <ScaleFrame FrameIndex="0" X="1.0000" Y="1.0000">
            <EasingData Type="-1">
              <Points>
                <PointF />
                <PointF />
                <PointF X="1.0000" Y="1.0000" />
                <PointF X="1.0000" Y="1.0000" />
              </Points>
            </EasingData>
          </ScaleFrame>
          <ScaleFrame FrameIndex="54" X="1.0000" Y="1.0000">
            <EasingData Type="-1">
              <Points>
                <PointF />
                <PointF />
                <PointF X="1.0000" Y="1.0000" />
                <PointF X="1.0000" Y="1.0000" />
              </Points>
            </EasingData>
          </ScaleFrame>
        </Timeline>
        <Timeline ActionTag="1553465698" Property="RotationSkew">
          <ScaleFrame FrameIndex="0" X="0.0000" Y="0.0000">
            <EasingData Type="-1">
              <Points>
                <PointF />
                <PointF />
                <PointF X="1.0000" Y="1.0000" />
                <PointF X="1.0000" Y="1.0000" />
              </Points>
            </EasingData>
          </ScaleFrame>
          <ScaleFrame FrameIndex="54" X="0.0000" Y="0.0000">
            <EasingData Type="-1">
              <Points>
                <PointF />
                <PointF />
                <PointF X="1.0000" Y="1.0000" />
                <PointF X="1.0000" Y="1.0000" />
              </Points>
            </EasingData>
          </ScaleFrame>
        </Timeline>
      </Animation>
      <ObjectData Name="Layer" ctype="GameLayerObjectData">
        <Size X="1280.0000" Y="720.0000" />
        <Children>
          <AbstractNodeData Name="Map_Battlemap_3" ActionTag="1810262115" Tag="3512" IconVisible="False" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="285.0671" RightMargin="354.9329" TopMargin="45.5956" BottomMargin="34.4044" ctype="GameMapObjectData">
            <Size X="640.0000" Y="640.0000" />
            <AnchorPoint />
            <Position X="285.0671" Y="34.4044" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.2227" Y="0.0478" />
            <PreSize X="1.0000" Y="1.0000" />
            <FileData Type="Normal" Path="BattleScene/sandbg/sand.tmx" Plist="" />
          </AbstractNodeData>
          <AbstractNodeData Name="boss" ActionTag="-1447462100" Tag="3513" IconVisible="True" PositionPercentXEnabled="True" PositionPercentYEnabled="True" LeftMargin="1092.7590" RightMargin="187.2410" TopMargin="680.6806" BottomMargin="39.3194" InnerActionSpeed="0.4000" ctype="ProjectNodeObjectData">
            <Size />
            <Children>
              <AbstractNodeData Name="Image_Monsterblood_8_29_2" ActionTag="1692814645" Tag="3602" IconVisible="False" LeftMargin="-166.0840" RightMargin="111.0840" TopMargin="-433.0795" BottomMargin="370.0795" Scale9Width="55" Scale9Height="63" ctype="ImageViewObjectData">
                <Size X="55.0000" Y="63.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="-138.5840" Y="401.5795" />
                <Scale ScaleX="0.8000" ScaleY="0.8000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition />
                <PreSize />
                <FileData Type="Normal" Path="Common/Cn17.png" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="Image_Bossbloodbg_7_31_4" ActionTag="1865289845" Tag="3603" IconVisible="False" LeftMargin="-138.5867" RightMargin="-139.4133" TopMargin="-426.0795" BottomMargin="373.0795" Scale9Width="278" Scale9Height="53" ctype="ImageViewObjectData">
                <Size X="278.0000" Y="53.0000" />
                <Children>
                  <AbstractNodeData Name="LoadingBar_Bossblood_9_20_2" ActionTag="744783602" Tag="3604" IconVisible="False" LeftMargin="35.6912" RightMargin="42.3088" TopMargin="19.0858" BottomMargin="19.9142" ctype="LoadingBarObjectData">
                    <Size X="200.0000" Y="14.0000" />
                    <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                    <Position X="135.6912" Y="26.9142" />
                    <Scale ScaleX="1.2000" ScaleY="2.5000" />
                    <CColor A="255" R="253" G="5" B="5" />
                    <PrePosition X="0.4881" Y="0.5078" />
                    <PreSize X="0.7194" Y="0.2642" />
                    <ImageFileData Type="Default" Path="Default/LoadingBarFile.png" Plist="" />
                  </AbstractNodeData>
                </Children>
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="0.4133" Y="399.5795" />
                <Scale ScaleX="0.8000" ScaleY="0.8000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition />
                <PreSize />
                <FileData Type="Normal" Path="BattleScene/BS14.png" Plist="" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint />
            <Position X="1092.7590" Y="39.3194" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.8537" Y="0.0546" />
            <PreSize />
            <FileData Type="Normal" Path="GeneralShark.csd" Plist="" />
          </AbstractNodeData>
          <AbstractNodeData Name="jack" ActionTag="1553465698" Tag="3605" IconVisible="True" LeftMargin="29.4898" RightMargin="1250.5103" TopMargin="687.2338" BottomMargin="32.7662" InnerActionSpeed="0.4000" ctype="ProjectNodeObjectData">
            <Size />
            <AnchorPoint />
            <Position X="29.4898" Y="32.7662" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.0230" Y="0.0455" />
            <PreSize />
            <FileData Type="Normal" Path="Captain_Jack.csd" Plist="" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameProjectFile>